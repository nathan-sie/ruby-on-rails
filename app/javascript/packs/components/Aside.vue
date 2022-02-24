
<template>
  <!--  height:calc(100vh - 70px)-->
  <!--  <el-scrollbar>-->
    <el-form :model="asideform" ref="aside">
    <el-menu :default-openeds='["1"]'
             style="width:300px;height:calc(100vh - 120px);overflow-y: scroll; margin-left: -20px"
             default-active="1"
             text-color="black"
             active-text-color="#ffd04b"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
      <div style="margin-left: 20px ; margin-top: 20px ; font-size: 25px">Control Panel</div>
      <div style="margin-left: 20px ; margin-top: 20px ;font-size: 20px">Settings</div>

      <el-sub-menu index="1">
        <template #title>
          <span>General Settings</span>
        </template>
          <div style="margin-left: 25px ; font-size: 13px">
            Working Mode
          </div>
          <el-radio-group style="margin-left: 25px" v-model="asideform.working_mode" >
            <el-radio :label="1">FaceGen</el-radio>
            <el-radio :label="2">Photo-realistic</el-radio>
            <el-radio :label="3">CG to Realistic</el-radio>
          </el-radio-group>
          <div style="margin-left: 25px;margin-top: 5px ; margin-bottom: 5px;font-size: 13px">
            Generative Model
          </div>
          <el-select v-model="value" size="normal" style="width: 90% ; margin-left: 15px" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <div style="margin-left: 25px;margin-top: 5px;font-size: 13px">
            <div>
              <el-checkbox v-model="asideform.initializeavarage" label="Initialize with the average face"></el-checkbox>
            </div>
          </div>
          <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 1px;font-size: 13px">
            Random Seed:
          </div>
          <el-input-number
              v-model="asideform.randomseed"
              style="margin-left: 15px;margin-top: 10px;width: 90%"
              @change="handleChange"
              :min="1"
              label="描述文字"
          ></el-input-number>
          <div style="margin-left: 25px;margin-top: 8px; margin-bottom: 2px;font-size: 13px">
            Style Scale
          </div>
          <el-input-number
              v-model="asideform.stylescale"
              style="margin-left: 15px; margin-top: 10px;width: 90%"
              :precision="2"
              :step="0.01"
              :max="1"
              :min="-1"
          ></el-input-number>

      </el-sub-menu>


      <el-sub-menu index="2">
        <!-- <el-menu-item-group> -->
        <template #title>
          <span style="font-size: 15px">Advanced Settings</span>
        </template>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Regression Model
        </div>
        <div style="margin-left: 25px">
          <el-radio v-model="asideform.regression" label="1">lr</el-radio>
          <el-radio v-model="asideform.regression" label="2">svr</el-radio>
        </div>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Direction Type
        </div>
        <div style="margin-left: 25px">
          <el-radio v-model="asideform.direction" label="1">z</el-radio>
          <el-radio v-model="asideform.direction" label="2">w</el-radio>
        </div>
        <div style="margin-left: 25px;margin-top: 5px;font-size: 13px">
          <div>
            <el-checkbox v-model="asideform.apofg" label="Allow projection on FaceGen"></el-checkbox>
          </div>
        </div>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Projection Steps
        </div>
        <el-input-number
            v-model="asideform.steps"
            style="margin-left: 15px;margin-top: 10px;width: 90%"
            @change="handleChange"
            :min="1"
            label="描述文字"
        ></el-input-number>
        <div style="margin-left: 25px;margin-top: 5px;font-size: 13px">
          <div>
            <el-checkbox v-model="asideform.feature" label="Display estimated feature values."></el-checkbox>
          </div>
        </div>
        <div style="margin-left: 25px;margin-top: 3px;font-size: 13px">
          <div>
            <el-checkbox v-model="asideform.dir_pos" label="Display direction pos/neg buttons."></el-checkbox>
          </div>
        </div>
        <div>
          <el-button style="margin-left: 20px ; width: 90% ; font-size: 14px"  type="info" plain>Reset direction pos/neg</el-button>
        </div>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Tool to modify feature values
        </div>
        <el-radio-group style="margin-left: 25px" v-model="asideform.modifyfeature" >
          <el-radio :label="1">Slider</el-radio>
          <el-radio :label="2">Number</el-radio>
        </el-radio-group>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Disentangle
        </div>
        <el-radio-group style="margin-left: 25px" v-model="asideform.disentangle" >
          <el-radio :label="1">Automatic</el-radio>
          <el-radio :label="2">Manual</el-radio>
        </el-radio-group>
        <!-- </el-menu-item-group> -->
        </el-sub-menu>
      

      <div style="margin-left: 20px ; margin-top: 20px ;font-size: 20px">Features</div>
      <div style="margin-left: 20px; margin-top: 10px"><el-button size="medium">Reset</el-button></div>
      <div style="margin-left: 25px;margin-top: 17px ; font-size: 15px">
        Features to be disentangled
      </div>
      <div style="margin-top: 10px; margin-left: 5px">
        <el-select v-model="value" size="normal" style="width: 90% ; margin-left: 15px" placeholder="Choose an option">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>

      <el-sub-menu index="3">
        <template #title>
          <span style="font-size: 15px">FaceGen:General</span>
        </template>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">age</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.age" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">gender</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.gender" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">african</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.african" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">eastAsian</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.eastAsian" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">southAsian</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.southAsian" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">european</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.european" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <span style="font-size: 15px">FaceGen:Detail</span>
        </template>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Cheeks Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.bcheeks" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Circle Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.bcircle" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Flushed / Pale</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.bflush" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Goatee Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.bgoatee" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.blight" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Moustache Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.bmoustache" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Brow Ridge - forward axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.brforward" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Brow Ridge - high / low</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.brhigh" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Brow Ridge Inner - down / up</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.bridown" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Brow Ridge Outer - up / down</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.broup" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheek Blush - Light / Red</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cblight" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheekbones - low / high</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cblow" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheekbones - protrusion asymmetry</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cbprotrusion" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheekbones - shallow / pronounced</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cbshallow" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheekbones - thin / wide</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cbthin" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheeks - concave / convex</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cbconcave" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheeks - round / gaunt</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cround" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - chin axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.caxis" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - forward / backward</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cforward" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - forward axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ctwist" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - pronounced / recessed</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cpronounced" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - retracted / jutting</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cretracted" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - shallow / deep</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cshallow" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - small / large</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.csmall" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - tall / short</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ctall" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - transverse shift</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ctransverse" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - wide / thin</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.cwide" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eye Sockets - Bruised / Bright</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.esbright" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eye Sockets - Dark / Light</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.esdark" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eye Whites - Dim / Bright</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ewhites" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Dark / Light</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ebdark" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Low / High</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.eblow" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Lower Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ebldark" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Outer Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ebodark" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Thick / Thin</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ebthick" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Underneath Inner Lightness Fix Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ebui" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Underneath Lightness Fix Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ebul" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Upper Dark / Light</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ebudark" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Very Thin / Thick</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ebvthin" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyelids - Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.eldark" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyelids - Pale / Red</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.elpale" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyeliner - Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.eliner" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - Dark Brown / Light Blue</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.edblue" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - Dark Brown / Light Brown</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.edbrown" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - apart / together</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.eapart" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - down / up</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.edown" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - height disparity</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.eheight" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - small / large</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.esmall" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - tilt inward / outward</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.etilt" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - transverse shift</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.etransverse" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyeshadow - Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.eshadow" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - brow-nose-chin ratio</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fbnc" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - coronal bend</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fcbend" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - coronal shear</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fcshear" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - forehead-sellion-nose ratio</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ffsn" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - heavy / light</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fheavy" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - round / gaunt</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fround" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - tall / short</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ftall" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - up / down</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fup" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - vertical axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fvertical" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - wide / thin</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fwide" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Forehead - forward axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ffaxis" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Forehead - small / large</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fsmall" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Forehead - tall / short</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fhtall" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Forehead - tilt forward / back</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.ftilt" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Head - thin / wide</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.hthin" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Jaw - retracted / jutting</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.jretracted" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Jaw - wide / thin</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.jwide" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Jaw-Neck - slope high / low</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.jnslope" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Jawline - concave / convex</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.jline" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Lips - Flushed / Pale</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.lflush" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Lipstick - Dark Blue / Light Red</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.lsblue" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Lipstick - Dark Red / Light Blue</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.lsred" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - Lips deflated / inflated</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.mldeflated" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - Lips large / small</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.mlsmall" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - Lips puckered / retracted</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.mlpuckered" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - Lips thin / thick</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.mlthin" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - corners transverse shift</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.mcorner" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
      </el-sub-menu>

      <el-sub-menu index="5">
        <template #title>
          <span style="font-size: 15px">AWS:General</span>
        </template>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Age</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.awsage" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Gender</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.awsgender" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.beard" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mustache</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.moustache" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Smile</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.smile" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">EyesOpen</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.eyesopen" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">MouthOpen</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.mouthopen" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyeglasses</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.eyeglasses" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Sunglasses</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.sunglasses" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Pose_Yaw</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.pose_yaw" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Pose_Roll</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.pose_roll" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Quality_Brightness</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.quality_brightness" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Quality_Sharpness</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.quality_sharpness" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
      </el-sub-menu>

      <el-sub-menu index="6">
        <template #title>
          <span style="font-size: 15px">AWS:Emotion</span>
        </template>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_ANGRY</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.angry" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_DISGUSTED</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.disgusted" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_CONFUSED</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.confused" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_SURPRISED</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.surprised" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_FEAR</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="asideform.fear" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
      </el-sub-menu>
      
      <div style="margin-left: 20px; margin-bottom: 10px">
        <el-button style="width: 250px" size="medium " @click="onSubmit">Submit</el-button>
      </div>
            <!-- <div style="margin-left: 10px; margin-bottom: 5px">
        <el-button style="width: 100px" size="small " @click="showTime">tstt</el-button>
      </div> -->
    </el-menu>
    </el-form>
  <!--  </el-scrollbar>-->
</template>

<script setup> 
import { reactive, ref, toRefs ,getCurrentInstance, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
      const route = useRoute()
      onMounted(()=>{
        console.log("获取到的参数",route.query.id)
      })
      const asideform = reactive({
        working_mode:2,
        initializeavarage:false,
        randomseed:205,
        stylescale:1.00,
        apofg:true,
        stylescale:1.00,
        steps:1000,
        feature:true,
        direction:'2',
        regression:'1',
        dir_pos:false,
        modifyfeature:2,
        disentangle:2,
        age:50,
        gender:50,
        african:50,
        eastAsian:50,
        southAsian:50,
        european:50,
        bcheeks:50,
        bcircle:50,
        bflush:50,
        bgoatee:50,
        blight:50,
        bmoustache:50,
        brforward:50,
        brhigh:50,
        bridown:50,
        broup:50,
        cblight:50,
        cblow:50,
        cbprotrusion:50,
        cbshallow:50,
        cbthin:50,
        cconcave:50,
        cround:50,
        caxis:50,
        cforward:50,
        ctwist:50,
        cpronounced:50,
        cretraced:50,
        cshallow:50,
        csmall:50,
        ctall:50,
        ctransverse:50,
        cwide:50,
        esbright:50,
        esdark:50,
        ewhite:50,
        eblight:50,
        eblow:50,
        ebldark:50,
        ebodark:50,
        ebthick:50,
        ebui:50,
        ebul:50,
        ebudark:50,
        ebvthin:50,
        eldark:50,
        elpale:50,
        eliner:50,
        edblue:50,
        edbrown:50,
        eapart:50,
        edown:50,
        eheight:50,
        esamll:50,
        etilt:50,
        etransverse:50,
        eshadow:50,
        fbnc:50,
        fcbend:50,
        fcshear:50,
        ffsn:50,
        fheavy:50,
        fround:50,
        ftall:50,
        fup:50,
        fvertical:50,
        fwide:50,
        ffaxis:50,
        fsamll:50,
        fhtall:50,
        ftilt:50,
        hthin:50,
        jretracted:50,
        jwide:50,
        jnslope:50,
        jline:50,
        lflush:50,
        lsblue:50,
        lsred:50,
        mldeflat:50,
        mllarge:50,
        mlpuckered:50,
        mlthin:50,
        mcorner:50,
        awsage:50,
        awsgender:50,
        beard:50,
        mustache:50,
        smile:50,
        eyesopen:50,
        mouthopen:50,
        eyegalsses:50,
        sunglasses:50,
        pose_yaw:50,
        pose_roll:50,
        qbrightness:50,
        qsharpness:50,
        angry:50,
        digusted:50,
        confused:50,
        surprised:50,
        fear:50,
      })
      console.log(asideform)
      // const value1 =ref(50)
      // const value2 =ref(50)
      // const value3 =ref(50)
      // const value4 =ref(50)
      // const value5 =ref(50)
      // const value6 =ref(50)
      // const value7 =ref(50)
      // const value8 =ref(50)
      // const value9 =ref(50)
      // const value10 =ref(50)
      // const value11 =ref(50)
      // const isCollapse = ref(true)
      // const radio =  ref(2)
      // const regression = ref('1')
      // const direction =  ref('2')
      // const initializeavarage = ref(false)
      // const apofg = ref(true)
      // const stylescale = ref(1.00)
      // const randomseed = ref(205)
      // const steps = ref(1000)
      // const feature = ref(true)
      // const dir_pos = ref(false)
      // const modifyfeature = ref(2)
      // const disentangle = ref(2)
      const formatTooltip = (val) => {
        return (((val -50 ))/ 5).toFixed(2)
      }
      const handleOpen = (key,keyPath)=>{
        console.log(key,keyPath)
      }
      const handleClose = (key,keyPath) =>{
        console.log(key,keyPath)
      }

    //   const showTime = async () =>{
        
    //     var time;
    //     let yy = new Date().getFullYear();
    // 　　let mm = new Date().getMonth()+1;
    // 　　let dd = new Date().getDate();
    // 　　let hh = new Date().getHours();
    // 　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    // 　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    //     time = yy+''+mm+''+dd+''+hh+''+mf+''+ss;
    //     console.log("time is : " + time);
    //     return time;
    //   }
      
      const onSubmit = async () =>{
        const uid = route.query.id;
        let yy = new Date().getFullYear();
    　　let mm = new Date().getMonth()+1;
    　　let dd = new Date().getDate();
    　　let hh = new Date().getHours();
    　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        var nid = yy+''+mm+''+dd+''+hh+''+mf+''+ss+''+uuidv4().substr(16);
         axios.post(`/submit`, {user_id :uid,name :nid,status :"on"}).then
         (response => {
            if(response.status ===0){
                    errorinfo = response.message
                  }else{
                    console.log("Created!");
                    console.log(nid);
                  }
              })

      }


</script>

<style>
.featurename{
  display: inline-block;
  margin-top: -30px;
  font-size: 12px;
  margin-bottom: 25px;
}
</style>
