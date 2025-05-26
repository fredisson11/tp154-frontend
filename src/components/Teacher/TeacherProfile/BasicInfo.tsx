const BasicInfo = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => (
  <span>
    {label}: <span className="text-main-dark">{value}</span>
  </span>
)

export default BasicInfo
