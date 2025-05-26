import SearchComponent from '@/components/ui/SearchComponent'
import TeacherCard from '@/components/Teacher/TeacherCard'
import SortDropdown from '@/components/ui/SortDropdown'
import NavigateButton from '@/components/ui/NavigateButton'

function SearchPage() {
  const mockTeachers = [
    {
      teacherId: 1,
      name: 'Іван Іванов',
      age: 30,
      city: 'Київ',
      classes: '5-9',
      experience: 8,
      subjects: [
        'Математика',
        'Фізика',
        'Українська мова',
        'Українська література',
      ],
      rating: 4.8,
      reviews: 50,
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea hic tempora laudantium consectetur animi id esse tenetur? Cupiditate totam illum ducimus non eius perferendis consequuntur at, consectetur laudantium deserunt praesentium? Amet quod, assumenda error a repudiandae quisquam eligendi cumque magni eaque deleniti. Suscipit voluptates tempora dolores dignissimos dolorum eveniet alias?',
      price: 200,
    },
    {
      teacherId: 2,
      name: 'Олена Петрівна',
      age: 45,
      city: 'Львів',
      classes: '10-11',
      experience: 20,
      subjects: ['Українська мова', 'Література'],
      rating: 4.9,
      reviews: 100,
      bio: 'Професійний репетитор з української мови та літератури з понад 20 років досвіду.',
      price: 250,
    },
  ]

  return (
    <>
      <NavigateButton showHome={true} className="md:hidden" />

      {/* title + description */}
      <section className="section-container flex justify-center relative">
        <NavigateButton
          showHome={true}
          className="hidden md:flex absolute left-0"
        />

        <div className="md:w-1/2 space-y-10">
          <h1>Наші репетитори</h1>

          <p className="text-center">
            На нашій платформі працюють лише досвідчені та ретельно перевірені
            репетитори. Вони допоможуть вам або вашій дитині покращити знання та
            подолати будь-які труднощі в навчанні.
          </p>
        </div>
      </section>

      {/* teachers */}
      <section className="section-container card-container gap-14">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* count */}
          <p className="font-semibold text-3xl text-center">
            Показано {mockTeachers.length} з 100 вчителів
          </p>

          {/* sort */}
          <div className="w-1/2 flex justify-end">
            <SortDropdown />
          </div>
        </div>

        {/* search */}
        <SearchComponent />

        {/* teachers cards */}
        <div className="flex flex-col gap-10">
          {mockTeachers.map((teacher, index) => (
            <TeacherCard key={index} {...teacher} />
          ))}
        </div>
      </section>
    </>
  )
}

export default SearchPage
