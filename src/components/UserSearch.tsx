type UserSearchProps = {
  value: string;
  onChange: (e: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  //to-do: onSubmit
};

export default function UserSearch({
  value,
  onChange,
  onSubmit,
}: UserSearchProps) {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="user-search">Search for a user:</label>
      <input
        type="search"
        id="user-search"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <input type="submit" value="Get Repos" />
    </form>
  );
}
