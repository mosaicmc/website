import { Link } from 'react-router-dom';

interface PDFAccessibilityNoticeProps {
  className?: string;
}

export function PDFAccessibilityNotice({ className = '' }: PDFAccessibilityNoticeProps) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      PDF format.{' '}
      <Link to="/contact-us" className="text-primary hover:underline">
        Contact us
      </Link>{' '}
      for alternative formats.
    </p>
  );
}
