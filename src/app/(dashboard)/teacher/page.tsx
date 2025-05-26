import TeacherDashboardInfo from '@/components/Dashboard/Teacher/TeacherDashboardInfo'
import OpenParagraph from '@/components/ui/OpenParagraph'

function TeacherPage() {
  return (
    <>
      {/* Teacher info */}
      <section className="dashboard-container">
        <TeacherDashboardInfo />
      </section>

      {/* Teacher about */}
      <section className="dashboard-container space-y-10">
        <OpenParagraph gradientColor="background" title="Про себе">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quasi
          totam nostrum maxime commodi voluptates! Beatae quos deleniti, omnis
          pariatur magni consequuntur error at sed consectetur deserunt?
          Architecto, totam autem.
        </OpenParagraph>

        <OpenParagraph gradientColor="background" title="Хобі">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quasi
          totam nostrum maxime commodi voluptates! Beatae quos deleniti, omnis
          pariatur magni consequuntur error at sed consectetur deserunt?
          Architecto, totam autem.
        </OpenParagraph>

        <OpenParagraph gradientColor="background" title="Освіта">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quasi
          totam nostrum maxime commodi voluptates! Beatae quos deleniti, omnis
          pariatur magni consequuntur error at sed consectetur deserunt?
          Architecto, totam autem.
        </OpenParagraph>

        <OpenParagraph gradientColor="background" title="Як проходить урок">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quasi
          totam nostrum maxime commodi voluptates! Beatae quos deleniti, omnis
          pariatur magni consequuntur error at sed consectetur deserunt?
          Architecto, totam autem.
        </OpenParagraph>
      </section>
    </>
  )
}

export default TeacherPage
