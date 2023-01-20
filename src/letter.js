export class Letter {
  constructor(userId) {
    this.userId = userId;

    return this.get().newStructure;
  }

  async get() {
    const UserUrl = `https://jsonplaceholder.typicode.com/users/${this.userId}`;
    const PostsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${this.userId}`;

    let userObj = [];
    let postsArr = [];

    //Fetch User
    const userRes = await fetch(UserUrl);
    userObj = await userRes.text();
    userObj = userObj === "" ? {} : JSON.parse(userObj);

    //Fetch Posts
    const postsRes = await fetch(PostsUrl);
    postsArr = await postsRes.text();
    postsArr = postsArr === "" ? {} : JSON.parse(postsArr);

    //Generic Handle Errors for this project
    if (userRes.status !== 200) {
      return "The number is above 10";
    }
    if (postsRes.status !== 200) {
      return "The number is above 10";
    }

    if (userRes.status === 200 && postsRes.status === 200) {
      //Create New Structure
      const newStructure = Object.assign(userObj, { posts: postsArr });
      return newStructure;
    }
  }
}
