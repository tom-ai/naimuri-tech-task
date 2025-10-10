import type { Repo } from '@root/types';
import { getLanguagesUsed } from '@root/utils/helpers';

type FiltersProps = {
  repos: Repo[];
};

export default function Filters({ repos }: FiltersProps) {
  const languages = getLanguagesUsed(repos);

  return (
    <form>
      <fieldset>
        <legend>Select a language to filter by:</legend>
        <ul className="reset-list-style">
          {languages.map((language, index) => (
            <li key={`lang-${index}`}>
              <input type="checkbox" id={language} name={language} />
              <label htmlFor={language}>{language}</label>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
}
