import Accordion from '@/components/ui/Accordion'
import BackgroundMain from '@/components/BackgroundMain'
import Card from '@/components/ui/Card'
import Carousel from '@/components/Carousel'
import SearchComponent from '@/components/ui/SearchComponent'
import MainButton from '@/components/ui/MainButton'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main>
        <BackgroundMain />

        {/* main section */}
        <section className="section-container flex flex-col items-center lg:flex-row gap-15">
          {/* first block */}
          <div className="w-3/4 flex flex-col items-center lg:items-start">
            {/* title */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <h1>Навчайся</h1>
              <Card />
              <h1 className="lg:text-left">
                легко та <br className="md:hidden" />
                результативно
              </h1>
              <span className="text-main-dark lg:text-gray-400 text-center text-base md:text-xl">
                на оствітній платформі <br className="md:hidden" />
                Астра+
              </span>
            </div>

            {/* button */}
            <MainButton
              className="w-full md:w-[45%] mt-[8%]"
              href="/register?initialRole=student"
            >
              Почати навчання
            </MainButton>
          </div>

          {/* second block */}
          <div className="w-full md:w-[90%] lg:w-3/4 flex items-center justify-center overflow-hidden">
            <Image
              src="/main-pic.png"
              alt="main image"
              className="w-full h-auto max-w-full object-contain"
              width={700}
              height={400}
              priority
            />
          </div>
        </section>

        {/* tutors section */}
        <section className="container-fluid mt-12">
          <div className="flex flex-col items-center space-y-10">
            {/* title */}
            <h1>Репетитори</h1>
            {/* description */}
            <p className="text-center w-3/4 md:w-1/2">
              На нашій платформі працюють лише досвідчені та ретельно перевірені
              репетитори. Вони допоможуть вам або вашій дитині покращити знання
              та подолати будь-які труднощі в навчанні.
            </p>

            {/* carousel */}
            <div className="w-full">
              <Carousel />
            </div>
          </div>
        </section>

        {/* search tutors */}
        <section
          id="search"
          className="section-container flex flex-col items-center gap-12"
        >
          {/* title */}
          <h1>Знайдіть свого репетитора просто зараз!</h1>

          {/* search */}
          <SearchComponent color="background" />
        </section>

        {/* register as tutor */}
        <section id="register" className="container-fluid pl-5 lg:pl-0 pr-5">
          <div className="flex items-stretch flex-col-reverse lg:flex-row gap-7 lg:gap-12 justify-between">
            {/* image */}
            <div className="w-full lg:basis-3/4 relative aspect-[16/9] lg:aspect-auto">
              <Image
                src="/create-profile-pic.jpg"
                alt="create profile"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover rounded-2xl lg:rounded-l-none"
              />
            </div>

            {/* register as tutor block */}
            <div className="w-full lg:basis-2/4 form-block">
              <h2 className="font-semibold">Хочете стати репетитором?</h2>

              <p className="text-center lg:max-w-2/3">
                Заповніть форму і почніть свій шлях менторства за лічені
                хвилини.
              </p>

              <MainButton
                className="w-full"
                secondaryStyle={true}
                href="/register?initialRole=teacher"
              >
                Створити профіль
              </MainButton>
            </div>
          </div>
        </section>

        {/* faq */}
        <section id="faq" className="section-container">
          <h1>Часті запитання</h1>

          <div className="mt-12">
            <Accordion />
          </div>
        </section>

        <section className="container-fluid">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-[5%] py-[10%] lg:py-[2%] bg-primary">
            <h2 className="text-white leading-snug	">
              Почніть зміни свого життя вже сьогодні!
            </h2>

            <MainButton
              className="w-full md:w-1/2 lg:w-1/4"
              secondaryStyle={true}
              href="/register?initialRole=student"
            >
              Почати навчання
            </MainButton>
          </div>
        </section>
      </main>
    </>
  )
}
