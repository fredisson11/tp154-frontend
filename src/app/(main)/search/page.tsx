function SearchPage() {
  return (
    <>
      {/* title + description */}
      <section className="section-container flex justify-center">
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
      <section className="section-container bg-white shadow-md rounded-3xl"></section>
    </>
  )
}

export default SearchPage
