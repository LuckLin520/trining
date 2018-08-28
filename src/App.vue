<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>


<style>
body,
html {
    height: 100%;
    font-size: 12px;
}

#app {
    height: 100%;
    font-size: 14px;
}

td {
    vertical-align: middle!important;
}

ul {
    margin: 0px;
    padding: 0px;
}

li {
    list-style: none;
}

a:hover {
    text-decoration: none;
}

p {
    margin: 0;
}
#newclass input, #Seeclass input, #Seeclass select, #newclass select, #userInfo input, #userInfo select, #modifypassword input, #modifypassword select{
    height: 33px!important;
}
</style>

