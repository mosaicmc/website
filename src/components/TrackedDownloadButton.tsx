"use client";

import React from "react";
import { DOWNLOAD_CATALOG } from "@/lib/downloadCatalog";
import { handleTrackedDownload, DownloadFormData } from "@/lib/handleTrackedDownload";
import { DownloadGate } from "@/components/DownloadGate";
import { Button, ButtonProps } from "@/components/ui/button";
import { FileDown } from "lucide-react";

type TrackedDownloadButtonProps = ButtonProps & {
  downloadId: string;
  /**
   * Optional: Provide a custom render function for the trigger button.
   * If provided, `children` (as button content) and `ButtonProps` are ignored.
   */
  renderTrigger?: (onClick: () => void) => React.ReactNode;
  containerClassName?: string;
};

export function TrackedDownloadButton({
  downloadId,
  renderTrigger,
  children,
  containerClassName,
  ...buttonProps
}: TrackedDownloadButtonProps) {
  const item = DOWNLOAD_CATALOG.find((i) => i.id === downloadId);

  if (!item) {
    console.error(`TrackedDownloadButton: Download ID "${downloadId}" not found in catalog.`);
    return null;
  }

  const handleDownload = async (formData: DownloadFormData) => {
    await handleTrackedDownload(item, formData);
  };

  const resourceTypeLabel =
    item.category === "Volunteer Position Description"
      ? "position description"
      : item.category === "Corporate Policy"
      ? "policy"
      : "document";

  return (
    <DownloadGate
      downloadUrl={item.path}
      resourceLabel={item.label}
      category={item.category}
      resourceTypeLabel={resourceTypeLabel}
      containerClassName={containerClassName}
      onCustomSubmit={handleDownload}
    >
      {(openForm) => {
        if (renderTrigger) {
          return renderTrigger(openForm);
        }

        return (
          <Button onClick={openForm} {...buttonProps}>
            {children || (
              <>
                <FileDown className="mr-2 h-4 w-4" />
                Download {item.label}
              </>
            )}
          </Button>
        );
      }}
    </DownloadGate>
  );
}
