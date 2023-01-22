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

    //Fetch User and Posts
    const [user, posts] = await Promise.all([fetch(UserUrl), fetch(PostsUrl)]);

    //Handle Status
    switch (user.status) {
      case 404:
        return "The number is above 10, try again with a lower number";
      case 401:
        return "You dont have permission";
    }
    switch (posts.status) {
      case 404:
        return "The number is above 10, try again with a lower number";
      case 401:
        return "You dont have permission";
    }

    //Check HTTP status and create new response
    if (user.status === 200 && posts.status === 200) {
      userObj = await user.text();
      postsArr = await posts.text();

      userObj = userObj === "" ? {} : JSON.parse(userObj);
      postsArr = postsArr === "" ? {} : JSON.parse(postsArr);

      const newStructure = Object.assign(userObj, { posts: postsArr });
      return newStructure;
    }
  }
}
