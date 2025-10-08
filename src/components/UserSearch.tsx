type UserSearchProps = {
  value: string;
  onChange: (e: string) => void;
  //to-do: onSubmit
};

export default function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <form>
      <label htmlFor="user-search">Search for a user:</label>
      <input
        type="search"
        id="user-search"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        disabled
      />
      <input type="submit" value="Get Repos" disabled />
    </form>
  );
}
