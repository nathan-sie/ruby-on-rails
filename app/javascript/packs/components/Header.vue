<template>
  <div class ="flexclass" style="width:100% ;  margin-top:-15px;height: 60px; line-height: 50px;border-bottom: 1px solid #ccc; display: flex">
    <div style="width: 200px; padding-left: 30px; font-weight: bold;color: dodgerblue ; font-size: 30px">Latentface</div>
    <div style=" flex: 1; width: 200px; padding-left: 230px; font-weight: normal;color: dodgerblue ; font-size: 30px">A face generation and customization platform</div>
    <div style="width: 100px">
      <el-dropdown>
  <span class="el-dropdown-link">
    settings<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>反馈</el-dropdown-item>
            <el-dropdown-item>求助</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>
<style>
.flexclass{
  flex-flow: row nowrap;
  flex-direction: row
}

</style>