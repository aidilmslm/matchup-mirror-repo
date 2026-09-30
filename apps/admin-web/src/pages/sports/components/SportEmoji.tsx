// Sports emoji palette + picker.

const SPORT_EMOJIS = [
  '⚽',
  '🏀',
  '🏈',
  '⚾',
  '🥎',
  '🏐',
  '🏉',
  '🎾',
  '🥏',
  '🎱',
  '🏓',
  '🏸',
  '🥅',
  '🏒',
  '🏑',
  '🏏',
  '🥍',
  '🏹',
  '🥊',
  '🥋',
  '🛹',
  '🛼',
  '🛷',
  '⛸️',
  '🏋️',
  '🤼',
  '🤸',
  '⛹️',
  '🤺',
  '🏇',
  '🧘',
  '🏄',
  '🚣',
  '🧗',
  '🚴',
  '🏊',
  '🤽',
  '🚵',
  '🏌️',
  '🏂',
  '🛿',
  '⛷️',
  '🤾',
  '🎿',
  '🎣',
  '🏇',
  '🧜',
  '🤿',
  '🎯',
  '🎳',
  '🏆',
  '🥇',
  '🎽',
  '👟',
  '🥿',
  '⛳',
  '🎖️',
  '🏅',
];

export function EmojiPicker({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (e: string) => void;
}) {
  return (
    <div className="mt-1 max-h-40 overflow-y-auto rounded-xl border border-ink-200 bg-white p-2">
      <div className="grid grid-cols-8 gap-1">
        {SPORT_EMOJIS.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => onSelect(e)}
            className={`flex h-9 w-full items-center justify-center rounded-lg text-lg transition-colors hover:bg-ink-100 ${
              selected === e ? 'bg-brand-100 ring-2 ring-brand-400' : ''
            }`}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}
