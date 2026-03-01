export default function MissionValuesSection({ org }) {
  const { mission, values, biography } = org

  return (
    <div className="space-y-10">
      {/* About / Biography */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-3">About Us</h2>
        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{biography}</p>
      </section>

      {/* Mission */}
      {mission && (
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed text-lg border-l-4 border-kindr-primary pl-4">
            {mission}
          </p>
        </section>
      )}

      {/* Values */}
      {values && values.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Core Values</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.name}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:border-kindr-primary/40 hover:shadow-sm transition"
              >
                <span className="text-2xl mb-2 block" role="img" aria-hidden>{v.icon}</span>
                <h3 className="font-semibold text-slate-800">{v.name}</h3>
                {v.description && (
                  <p className="text-sm text-slate-500 mt-1">{v.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
