export type Owner = {
  login: string;
  htmlUrl: string;
};

export type Repo = {
  id: string;
  fullName: string; // full_name
  htmlUrl: string; // html_url
  owner: Owner;
  issues: number; // open_issues_count
  stars: number; // stargazers_count
  forks: number; //forks_count
};
