import { Post, User } from '../db';

const posts = [
  {
    'content': '# 晚安\n\n就酱紫',
    'type': 'text',
    'create_time': '2015-10-29T14:41:17.316Z',
    'author': {
      'name': '肖菀月',
      'email': 'loveyou@qq.com'
    }
  }, {
    'content': '来上课了，早饭还没吃...饿！',
    'type': 'image',
    'create_time': '2015-10-29T00:31:14.759Z',
    'author': {
      'name': 'xiaokekeT',
      'email': '121441909@qq.com'
    },
    'cover': '/images/03333_spinout_2880x1800.jpg'
  }, {
    'content': "# ES6有话说\n\n喜欢ES6的新特性，箭头函数(Arrow functions)，简单粗暴。 几个特点如下：\n\n- 自动绑定this\n- 更简洁，少打那么几个字母\n- 看上去更牛逼，更函数化\n- 写着也是十分简单，30秒上手\n\n```js\nconst funca = (name, age) =>{\n  // es6\n}\n\nconst funca = function(name, age) {\n  // 传统 \n}\n```\n\n对吧，新语法看着就很酷炫\n\n```js\nsocket.on('papapa', (data)=>{\n // xx\n})\n\n如果只有一个参数，则还可以省略掉括号，则变成如下形式\nsocket.on('papapa', data=>{\n // xx\n})\n\n//传统\nsocket.on('hehe', function(data) {\n // da\n})\n```\n\n当然了，酷炫不仅如此为什么说会更函数呢？ 在单行没有花括号情况下，隐式return\n\n```js\nconst arr = [1,2,3].map(num=> num+1)\n// arr [2,3,4]\n```\n\n恩，差不多就酱紫，自己所用到的也就这些，深感es6特性带来的方便，当然坑是有不少的。",
    'type': 'text',
    'create_time': '2015-10-29T00:21:03.759Z',
    'author': {
      'name': 'xiaokekeT',
      'email': '121441909@qq.com'
    },
    'cover': '/images/03333_spinout_2880x1800.jpg'
  }, {
    'content': 'Hello',
    'type': 'image',
    'create_time': '2015-10-30T00:54:23.113Z',
    'author': {
      'name': 'xiaokekeT',
      'email': '121441909@qq.com'
    },
    'cover': '/images/03016_strossmayer_2880x1800.jpg'
  }, {
    'content': '最爱的一首歌, 想去现场High',
    'type': 'music',
    'create_time': '2015-10-30T02:51:32.668Z',
    'author': {
      'name': 'xiaokekeT',
      'email': '121441909@qq.com'
    },
    'music': {
      'play': 0,
      'src': '/mp3/Hillsong Young And Free - Wake.mp3',
      'title': 'Wake',
      'author': 'Hillsong Young And Free',
      'cover': ''
    }
  }, {
    'content': '金大哥',
    'type': 'music',
    'create_time': '2015-10-31T02:37:39.123Z',
    'author': {
      'name': 'xiaokekeT',
      'email': '121441909@qq.com'
    },
    'music': {
      'play': 0,
      'src': '/mp3/金玟岐 - 腻味.mp3',
      'title': '腻味',
      'author': '金玟岐',
      'cover': ''
    }
  }
];
const user = [
  {
    'email': '123123@qq.com',
    'name': 'xiaokekeT',
    'password': '123123'
  }, {
    'email': 'loveyou@qq.com',
    'name': '肖菀月',
    'password': '123123'
  }
];

async function addUser() {
  for (const item of user) {
    await User.createUser(item);
  }
}
async function addPost() {
  for (const item of posts) {
    await Post.createPost(item);
  }
}
(async()=>{
  try {
    await Promise.all([addUser(), addPost()]);
  } catch (e) {
    console.error(e);
  }
})();
