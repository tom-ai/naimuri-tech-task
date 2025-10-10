type UserSearchProps = {
  value: string;
  onChange: (e: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
};

export default function UserSearch({
  value,
  onChange,
  onSubmit,
  isLoading,
}: UserSearchProps) {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="user-search">Enter a GitHub username:</label>
      <input
        type="search"
        id="user-search"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <button
        type="submit"
        disabled={isLoading || value === ''}
        aria-busy={isLoading}
      >
        Get Repos
      </button>
    </form>
  );
}
