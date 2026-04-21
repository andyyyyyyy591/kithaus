export default function DecoRule() {
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="flex-1 h-px bg-[rgba(42,31,20,0.15)]" />
      <div
        className="w-[6px] h-[6px] flex-shrink-0 rotate-45"
        style={{ background: '#9c7a52' }}
      />
      <div className="flex-1 h-px bg-[rgba(42,31,20,0.15)]" />
    </div>
  )
}
