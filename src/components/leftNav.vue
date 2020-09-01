<template>
<a-menu class="my_nav" style="max-width:256px" theme="dark" mode="inline" :default-selected-keys="['2']">
  <template v-for="(item,index) in list">
    <a-menu-item v-if="!item.children" :key="item.key">
      <a-icon type="pie-chart" />
      <span>{{ item.title }}</span>
    </a-menu-item>
    <sub-menu v-else :key="item.key" :menu-info="item" :menu-index="index"/>
  </template>
</a-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'
// :style="{top:(48*index)+'px !important'}"
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="(item,index) in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon type="pie-chart" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.key" :menu-info="item"/>
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overa,b,clap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
export default {
  name: 'leftNav',
  props: ['mainMenu'],
  data () {
    return {
      list: [

      ]
    }
  },
  components: {
    'sub-menu': SubMenu
  },
  created () {
    let list = this.mainMenu.filter(item => item.path === '/')
    list.map((item, index) => {
      item.key = index + 1
      this.hasChildren(item.children, item.key)
      return item
    })
    // this.getMenuList(this.mainMenu[0].children)
    console.log(list, '##########', this.list)
  },
  methods: {
    hasChildren (children, pkey) {
      if (children) {
        children.map((citem, cindex) => {
          citem.key = pkey + '.' + (cindex + 1)
          this.hasChildren(children.children, citem.key)
          return citem
        })
      }
    }
    // getMenuList (data) {
    //   data.forEach(item => {
    //     if (!item.redirect) {
    //       this.list.push(item)
    //     } else {
    //       if (item.children) {
    //         this.getMenuList(item.children)
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style>
/* .my_nav .ant-menu-item,.my_nav  .ant-menu-submenu{
  overflow: visible;
}
.my_nav .ant-tooltip,.my_nav .ant-menu-submenu-popup{
  right: 0 !important;
  top: 0 !important;
  left: auto!important;
  transform: translateX(calc(100% + 4px));
} */

.ant-menu-submenu-popup .ant-menu-submenu .ant-menu-submenu-popup{
  /* top: 0 !important; */
}
</style>
