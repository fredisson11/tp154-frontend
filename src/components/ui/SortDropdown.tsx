import CustomSelect from '@/components/ui/CustomSelect'

const SortDropdown = () => {
  const sortOptions = [
    'Рейтингу',
    'Верифікованим',
    'Від дорожчих до дешевших',
    'Від дешевших до дорожчих',
  ]

  return (
    <CustomSelect
      options={sortOptions}
      defaultOption="Рейтингу"
      label="Сортувати по:"
      className="w-full lg:w-1/2 flex-col gap-4 md:flex-row justify-center"
    />
  )
}

export default SortDropdown
