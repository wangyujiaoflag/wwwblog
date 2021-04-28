<template>
  <div id="home">
    <!-- 发表自己的看法 -->
    <input type="text" placeholder="我的看法" @blur="pushComment" v-model="value">
    <comment :list="list" @listchange="listchange"></comment>
  </div>
</template>

<script>
import comment from './comm.vue'
// import lists from '@/mock/mock.js'
export default {
  name: "home",
  components: {
    comment,
  },
  data() {
    return {
      value: '',
      list: [
    {
        content:'1',
        user: '张三',
        id: '123',
        parentId: '',
        replyId: '345',
        children: [
            {
                content: '12',
                user: '李四',
                id: '234',
                parentId: '123',
                children: [
                    {
                        content: '123',
                        user: '王五',
                        id: '345667',
                        parentId: '234',
                        children: [],
                    }
                ],
            }
        ]
    },
    {
        content:'2',
        user: '夫人',
        id: '1234',
        parentId: '',
        children: [
            {
                content: '21',
                user: '里斯',
                id: '234',
                parentId: '1234',
                children: [
                    {
                        content: '211',
                        user: '王五',
                        id: '345667',
                        parentId: '234',
                        children: [],
                    },
                    {
                        content: '212',
                        user: '和军',
                        id: '34589667667',
                        parentId: '234',
                        children: [],
                    }
                ],
            },
            {
              content: '22',
              user: '天雅',
              id: '234454',
              parentId: '1234',
              children: [],
            }
        ]
    }
],
      info: {},
    }
  },
  methods: {
    pushComment() {
      this.list.push({
        content: this.value,
        user: 'wangyghjkldfliaunr',
        id: '234dfrgr4',
        parentId: '',
        children: [],

      })
    },
    listchange({index,Ind}) {
      // ind为1.2.3 0.1.2 当前的父元素 index为子元素中的某一个
      let indexarr = Ind.split(".");
      // 最外层的那一个
      let item = this.list[indexarr[0]-0-1];
      let i = 1;
      while(i < indexarr.length) {
        if(item.children.length) {
          // 父亲
          item = item.children[indexarr[i++]-0-1];
        }
      }
      item.children.splice(index-1,1);
      console.log(item);
    },
  },
}
</script>