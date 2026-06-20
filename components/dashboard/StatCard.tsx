interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="text-4xl font-bold mt-3">
        {value}
      </h3>

      {subtitle && (
        <p className="text-green-600 text-sm mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}