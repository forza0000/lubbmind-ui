export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold">👋 أهلاً بك في LubbMind</h1>
      <p className="text-gray-600 mt-2">
        هذا هو الواجهة الرئيسية — هنا راح نضيف الإحصائيات، المرضى، والمواعيد.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold">المرضى اليوم</h2>
          <p className="text-3xl font-bold mt-2">23</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold">المواعيد القادمة</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold">الانتهت</h2>
          <p className="text-3xl font-bold mt-2">7</p>
        </div>
      </div>
    </main>
  )
}
