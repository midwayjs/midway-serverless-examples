import { Provide, Func, Inject } from '@midwayjs/decorator';
import fetch from 'node-fetch';
@Provide()
export class APIService {

  size = 50;

  @Inject()
  ctx: any;

  @Func('api.render', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return 'Building... Please refresh this page later.';
  }

  @Func('api.index')
  async index() {
    return {
      message: 'Hello Midway Serverless!',
    }
  }

  @Func('api.list')
  async list() {
    const { repo, branch, totalPage = 40 } = this.ctx.query;
    if (!repo) {
      return 'need repo';
    }
    let page = 1;
    let result = {};
    let currentPage = await this.getReposCommits(repo, branch, page);
    this.mergeUserToResult(currentPage, result);
    while (currentPage.length === this.size && page < totalPage) {
      currentPage = await this.getReposCommits(repo, branch, (page ++));
      this.mergeUserToResult(currentPage, result);
    }
    return {
      result,
      currentPage
    };
  }

  async getReposCommits(repo: string, branch: string, page: number) {
    const url = `https://api.github.com/repos/${repo}/commits?page=${page || 1}&per_page=${this.size}${branch ? `&sha=${branch}` : ''}`;
    console.log('url', url);
    return fetch(url).then((res: any) => res.json());
  }

  mergeUserToResult(currentPage: any, result: any) {
    if (!Array.isArray(currentPage)) {
      return;
    }
    currentPage.forEach(commit => {
      const userId = commit.author.login;
      if (!result[userId]) {
        result[userId] = {
          avatar: commit.author.avatar_url,
          name: commit.commit.author.name,
          commit: []
        };
      }
      result[userId].commit.push(commit.commit.committer.date);
    })
  }

}
