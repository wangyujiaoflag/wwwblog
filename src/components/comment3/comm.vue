<template>
    <div class="comment" v-if="reList.length">
        <div class="comment-tree"
          v-for="(item,index) in reList"
          :key="item.id+item.user+index"
         >
            <!-- 主评论 -->
            <div class="tree-father" 
             :style="{'marginLeft':marginLeft}">
             <span>{{ind}}{{ind === '' ? '' : '.'}}{{index+1}}</span>
                <!-- 第一层楼 -->
                <template v-if="item.parentId === ''">
                    <div>
                        <span style="color:green">{{item.user}}</span><span>评论</span>---<span>{{item.content}}</span>
                        <span style="color:skyblue" @click="showC(item.id)">展开评论 ({{item.children.length}})</span>
                        <span style="color:skyblue;margin:0 10px" @click="hideC(item.id)">收起评论 ({{item.children.length}})</span>
                        <span style="color:skyblue" @click="currentId = item.replyId">回复</span>
                        <span style="color:skyblue" @click="hideText">取消</span>
                        <!-- 新增回复 -->
                        <div v-show="item.user">
                            <input type="text" 
                            @blur="pushComment($event,item.user,item.id,item.children)"
                            v-model="value"
                            v-if="currentId === item.replyId"
                            :placeholder="'回复' + item.user+':'">
                        </div>
                    </div>
                </template>

                <!-- 其他 -->
                <template v-else>
                    <div>
                        <span>{{item.user}}<span>回复了</span>{{parentUser}}---</span>
                        <span>{{item.content}}</span>
                          <span style="color:skyblue" @click="showC(item.id)" v-show="item.children.length > 0">展开评论 ({{item.children.length}})</span>
                          <span style="color:skyblue;margin:0 10px" @click="hideC(item.id)" v-show="item.children.length > 0">收起评论 ({{item.children.length}})</span>

                          <span style="color:skyblue" @click="showText(item.id)">回复</span>
                          <span style="color:skyblue" @click="hideText">取消</span>
                          <!-- item: 要删除的项 -->
                          <span style="color:skyblue" @click="DelText(item,index+1)">删除</span>
                    </div>
                    <!-- 新增回复 -->
                    <div v-show="currentId === item.id">
                        <input type="text" 
                        @blur="pushComment($event,item.user,item.id,item.children)"
                        v-model="value"
                        :placeholder="'回复' + item.user+':'">
                    </div>
                </template>
            </div>
                <!-- 回复-递归子组件 -->
            <template v-if="item.children">
                <comment 
                v-show="item.isShow"
                :child="item.children"
                :ind="ind === '' ? (index+1+'') : ind +'.'+(index+1)+''"
                :level="level + 1"
                :list="item.children"
                :parent="item.parentId"
                @listchange="listchange"
                :parentUser="item.user">
                </comment>               
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'comment',
    data() {
        return {
            value: '',
            currentId: '',
            reList: [],
        }
    },
    created() {
        this.initArr();
    },
    computed:{
        marginLeft: function() {
            return this.level * 10 + 'px';
        },
    },
    methods: {
        // 必须传e  添加评论
        pushComment(e,user,pid,list) {
            list.push({
                content: this.value,
                parentId: pid,
                user: '我自己的user',
                id: '我自己的id',
                children: [],
                replyId: '123'
            });
            this.value = '';
            this.currentId = '';
            // console.log(user,pid,list);
        },
        // 显示文本框
        showText(id) {
            this.currentId = id;
        },
        hideText() {
            this.currentId = '';
        },
        // 删除评论
        DelText(item,index,ind) {
            let Ind = this.ind;
            this.$emit('listchange',{index,Ind});
        },
        listchange({index,Ind}) {
            // console.log(index,Ind,'listchange');
            this.$emit('listchange',{index,Ind});
        },
        // 子评论的显示与隐藏
        showC(id) {
            this.statusChange(id,true);
        },
        hideC(id) {
            this.statusChange(id,false);
        },
        // 状态改变
        statusChange(id,isShow) {
            let reList = JSON.parse(JSON.stringify(this.reList));
            reList.forEach(val=>{
                if(val.id === id) val.isShow = isShow;
            });
            this.reList = reList;
        },
        // 数组改造
        initArr() {
            // 是否显示/已删除
            this.list.forEach((val) => {
                val.isShow = true;
                val.isDel = false;
            });
            // 树的深度
            // for(let i = 0; i<this.list.length;i++) {
            //     let deep = 0;
            //     while(this.list[i].children.length>0) {
            //         deep = deep + this.list[i].children.length;
            //     }
            // }
            this.reList = this.list;
        }
    },
    props: {
        // 下一个子数组
        list:{
            type:Array,
            default: ()=>{
                return [];
            }
        },
        child:{
            type:Array,
            default: ()=>{
                return [];
            }
        },
        // 层级 计算padding等
        level: {
            type: Number,
            default: 0,
        },
        // 层级 计算padding等
        ind: {
            type: String,
            default: '',
        },
        // 父亲id
        parent: {
            type: String,
            default: '',
        },
        // 父亲用户名
        parentUser: {
            type: String,
            default: '',
        }
    }

}
</script>
<style lang="less" scoped>
.tree-father {
    margin: 10px;
}
.tree-son {
    padding-left: 10px;
}
</style>
