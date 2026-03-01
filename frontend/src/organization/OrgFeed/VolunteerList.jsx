import VolunteerCard from './VolunteerCard'

export default function VolunteerList({
  volunteers,
  variant,
  onMessage,
  onNotify,
  onAccept,
  onDecline,
  onProfileClick,
  emptyMessage,
}) {
  const defaultEmpty =
    variant === 'suggested'
      ? 'No suggested volunteers match this opportunity.'
      : 'No applications yet.'

  return (
    <div className="space-y-2">
      {volunteers.length === 0 ? (
        <p className="text-xs text-slate-400 italic py-2">{emptyMessage || defaultEmpty}</p>
      ) : (
        volunteers.map((v) => (
          <VolunteerCard
            key={v.id}
            volunteer={v}
            variant={variant}
            onMessage={onMessage}
            onNotify={onNotify}
            onAccept={onAccept}
            onDecline={onDecline}
            onProfileClick={onProfileClick}
          />
        ))
      )}
    </div>
  )
}
