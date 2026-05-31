type AlertMessagesProps = {
  success?: string | string[];
  error?: string | string[];
  warning?: string | string[];
};

function getValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export function AlertMessages({ success, error, warning }: AlertMessagesProps) {
  const alerts = [
    { type: "success", message: getValue(success), icon: "fa-check-circle", className: "bg-green-100 border-l-4 border-green-500 text-green-700" },
    { type: "error", message: getValue(error), icon: "fa-exclamation-circle", className: "bg-red-100 border-l-4 border-red-500 text-red-700" },
    { type: "warning", message: getValue(warning), icon: "fa-exclamation-triangle", className: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700" },
  ].filter((alert) => alert.message);

  if (!alerts.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 space-y-2">
      {alerts.map((alert) => (
        <div key={alert.type} className={`${alert.className} p-4`} role="alert">
          <div className="flex items-center">
            <i className={`fas ${alert.icon} mr-2`} />
            <p>{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
