import type { RepoLanguageOnly } from '@root/types';
import { describe, expect, it } from 'vitest';
import { getLanguagesUsed } from './helpers';

describe('Helpers - getLanguagesUsed', () => {
  describe('Given one repo', () => {
    it('should return the language', () => {
      const repos: RepoLanguageOnly[] = [{ language: 'TypeScript' }];

      expect(getLanguagesUsed(repos)).toEqual(['TypeScript']);
    });

    it('should return all languages, unique and sorted, does not include missing languages', () => {
      const repos: RepoLanguageOnly[] = [
        { language: 'TypeScript' },
        { language: 'C#' },
        { language: 'C#' },
        { language: undefined },
        { language: 'Python' },
        { language: 'TypeScript' },
      ];

      expect(getLanguagesUsed(repos)).toEqual(['C#', 'Python', 'TypeScript']);
    });
  });
});
