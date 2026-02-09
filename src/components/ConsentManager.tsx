"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConsentState = 'granted' | 'denied';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

export default function ConsentManager() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState<ConsentState>('granted'); // Default UI state is ON

  // Helper for safe gtag access
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (...args: any[]) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag(...args);
    }
  };

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem("mosaic-consent-status");
    
    if (!savedConsent) {
      // No choice yet, show banner
      // Note: Default consent (granted) is already active from layout.tsx
      setShowBanner(true);
    } else {
      // Apply saved consent on load to ensure consistency across sessions
      // If it was denied, we must enforce it again
      if (savedConsent === 'denied') {
        gtag('consent', 'update', {
          'analytics_storage': 'denied'
        });
        setAnalyticsConsent('denied');
      } else {
        // If granted, we ensure it's granted (though it is default)
        gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
        setAnalyticsConsent('granted');
      }
    }
  }, []);

  const handleAcceptAll = () => {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
    localStorage.setItem("mosaic-consent-status", "granted");
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    gtag('consent', 'update', {
      'analytics_storage': analyticsConsent
    });
    localStorage.setItem("mosaic-consent-status", analyticsConsent);
    
    // If denied, manually remove existing GA cookies for strict compliance
    if (analyticsConsent === 'denied') {
        document.cookie.split(";").forEach((c) => {
            if (c.trim().startsWith("_ga")) {
                 document.cookie = c
                  .replace(/^ +/, "")
                  .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            }
        });
    }

    setShowSettings(false);
    setShowBanner(false);
  };

  const openSettings = () => {
      // If user opens settings, sync state with current actual state (or saved state)
      const savedConsent = localStorage.getItem("mosaic-consent-status");
      if (savedConsent) {
        setAnalyticsConsent(savedConsent as ConsentState);
      }
      setShowSettings(true);
  }

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-slate-900 border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
           <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-foreground/80 md:max-w-2xl">
                <p className="font-semibold text-foreground mb-1">We value your privacy</p>
                <p>
                  We use cookies to improve your experience and analyze website traffic. 
                  By clicking "Accept all", you consent to our use of analytics. 
                  You can change your preferences at any time.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                 <Button variant="outline" onClick={openSettings} className="whitespace-nowrap">
                    Adjust settings
                 </Button>
                 <Button onClick={handleAcceptAll} className="bg-ocean text-white hover:bg-ocean/90 whitespace-nowrap">
                    Accept all
                 </Button>
              </div>
           </div>
        </div>
      )}

      {/* Settings Modal */}
      <Dialog.Root open={showSettings} onOpenChange={setShowSettings}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[110] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-border animate-in zoom-in-95 duration-200 focus:outline-none">
             <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-foreground">
                   Cookie Preferences
                </Dialog.Title>
                <Dialog.Close asChild>
                   <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                      <X className="h-5 w-5" />
                   </button>
                </Dialog.Close>
             </div>
             
             <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                   Manage your consent preferences for cookies on this website.
                </p>

                {/* Necessary */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                   <div>
                      <h3 className="text-sm font-medium text-foreground">Necessary</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                         Required for the website to function correctly. These cannot be disabled.
                      </p>
                   </div>
                   <div className="text-xs font-semibold text-ocean dark:text-sky bg-ocean/10 dark:bg-sky/10 px-2 py-1 rounded self-center whitespace-nowrap">
                      Always Active
                   </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border">
                   <div>
                      <h3 className="text-sm font-medium text-foreground">Analytics</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                         Helps us understand how visitors interact with our website.
                      </p>
                   </div>
                   <div className="flex items-center">
                      {/* Simple Toggle */}
                      <button 
                        onClick={() => setAnalyticsConsent(analyticsConsent === 'granted' ? 'denied' : 'granted')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 ${analyticsConsent === 'granted' ? 'bg-ocean' : 'bg-slate-200 dark:bg-slate-700'}`}
                        aria-pressed={analyticsConsent === 'granted'}
                        aria-label="Toggle Analytics"
                      >
                         <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${analyticsConsent === 'granted' ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className="ml-2 text-xs font-medium w-8 text-center">
                        {analyticsConsent === 'granted' ? 'ON' : 'OFF'}
                      </span>
                   </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4 opacity-60 p-3 rounded-lg border border-border/50">
                   <div>
                      <h3 className="text-sm font-medium text-foreground">Marketing</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                         Used for advertising and personalization.
                      </p>
                   </div>
                   <div className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded self-center whitespace-nowrap">
                      Not Used
                   </div>
                </div>
             </div>

             <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-border">
                 <Button variant="outline" onClick={() => setShowSettings(false)}>
                    Cancel
                 </Button>
                 <Button onClick={handleSaveSettings} className="bg-ocean text-white hover:bg-ocean/90">
                    Save preferences
                 </Button>
             </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
