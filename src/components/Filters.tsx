import type { Repo } from '@root/types';
import { getLanguagesUsed } from '@root/utils/helpers';

type FiltersProps = {
  languages: string[];
  handleToggle: (lang: string, checked: boolean) => void;
  selectedLanguages: string[];
};

export default function Filters({
  languages,
  handleToggle,
  selectedLanguages,
}: FiltersProps) {
  return (
    <form>
      <fieldset>
        <legend>Select a language to filter by:</legend>
        <ul className="reset-list-style">
          {languages.map((language, index) => {
            const checked = selectedLanguages.includes(language);

            return (
              <li key={`lang-${index}`}>
                <input
                  type="checkbox"
                  id={language}
                  name={language}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    handleToggle(language, e.currentTarget.checked)
                  }
                  checked={checked}
                />
                <label htmlFor={language}>{language}</label>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </form>
  );
}
