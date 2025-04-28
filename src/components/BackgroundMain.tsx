function BackgroundMain() {
  return (
    <div className="absolute inset-0 -z-10 w-full overflow-hidden">
      <div
        className="h-[700px] w-[700px] 2xl:h-full 2xl:w-[1200px] ml-auto bg-no-repeat bg-top-right bg-contain scale-x-[1.5] lg:scale-x-[1]
				transform -translate-x-12 lg:-translate-x-0"
        style={{
          backgroundImage: `url('/bg.svg')`,
        }}
      />
    </div>
  )
}
export default BackgroundMain
