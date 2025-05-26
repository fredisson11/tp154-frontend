async function TeacherCompletePage() {
  return (
    <form id="teacher-complete-form">
      <label htmlFor="lastName">Прізвище</label>
      <input type="text" id="lastName" name="lastName" required />
      <label htmlFor="firstName">Ім&apos;+я</label>
      <input type="text" id="firstName" name="firstName" required />
      <button type="submit">Зберегти</button>
    </form>
  )
}

export default TeacherCompletePage
