import { CLINIC } from "@/lib/clinic";

export function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.12-.28-.2-.58-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.43 9.89-9.88 9.89M20.46 3.49A11.82 11.82 0 0 0 12.05.2C5.5.2.16 5.54.16 12.09c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42" />
    </svg>
  );
}

export function WhatsAppButton({
  label = "Chat on WhatsApp",
  className = "",
  iconClassName = "size-4",
}: {
  label?: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <a
      href={CLINIC.whatsappHref}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-3 bg-sage text-ivory px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-sage-dark transition-colors ${className}`}
    >
      <WhatsAppIcon className={iconClassName} />
      {label}
    </a>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={CLINIC.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Tha Skin Clinic on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-sage-dark text-ivory p-4 shadow-xl shadow-navy/25 hover:bg-navy transition-colors"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="hidden sm:inline text-[10px] uppercase tracking-[0.25em] max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[12rem] group-hover:opacity-100 transition-all duration-500">
        Chat with us
      </span>
    </a>
  );
}
