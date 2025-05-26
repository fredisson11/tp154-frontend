import ChangeUserPhoto from '@/components/Dashboard/DashboardUi/ChangeUserPhoto'
import WorkingHours from '@/components/Teacher/TeacherProfile/WorkingHours'
import NavigateButton from '@/components/ui/NavigateButton'

function TeacherEditPage() {
  return (
    <>
      <NavigateButton className="my-10 md:ml-10" />

      <section className="dashboard-container dashboard-block">
        <form>
          {/* Top block: Photo, Price, Experience */}
          <div className="flex flex-wrap gap-6 mb-8">
            <ChangeUserPhoto />

            <div>
              <label
                htmlFor="price-per-hour"
                className="block mb-1 font-medium"
              >
                Ціна уроку:
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="price-per-hour"
                  name="price"
                  type="number"
                  defaultValue={150}
                  className="pl-2 dashboard-input w-24"
                />
                <span>грн/год</span>
              </div>
            </div>

            <div>
              <label htmlFor="experience" className="block mb-1 font-medium">
                Стаж викладання (в роках):
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                defaultValue={1}
                className="dashboard-input w-24"
              />
            </div>
          </div>

          {/* Base info */}
          <div className="flex justify-between">
            <fieldset className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block mb-1">
                    Ім’я
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    className="dashboard-input w-full"
                  />
                </div>

                <div>
                  <label htmlFor="last-name" className="block mb-1">
                    Прізвище
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    className="dashboard-input w-full"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block mb-1">
                    Місто
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="dashboard-input w-full"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block mb-1">
                    Вік
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    className="dashboard-input w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1">
                    Пошта
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="dashboard-input w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-1">
                    Телефон
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="dashboard-input w-full"
                  />
                </div>
              </div>
            </fieldset>

            {/* Working hours */}
            <fieldset>
              <WorkingHours />
            </fieldset>
          </div>
        </form>
      </section>
    </>
  )
}

export default TeacherEditPage
