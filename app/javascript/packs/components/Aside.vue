
<template>
  <!--  height:calc(100vh - 70px)-->
  <!--  <el-scrollbar>-->
  <div class>
    <el-menu :default-openeds='["1"]'
             style="width:300px;height:calc(100vh - 80px);overflow-y: scroll; margin-left: -30px"
             default-active="home"
             router
             background-color=""
             text-color="black"
             active-text-color="#ffd04b"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
      <div style="margin-left: 20px ; margin-top: 20px ; font-size: 30px">Control Panel</div>
      <div style="margin-left: 20px ; margin-top: 20px ;font-size: 20px">Settings</div>
      <el-sub-menu index="1">
        <template #title>
          <span style="font-size: 15px">General Settings</span>
        </template>
        <el-menu-item-group>
          <div style="margin-left: 25px;margin-top: -10px ; font-size: 13px">
            Working Mode
          </div>
          <el-radio-group style="margin-left: 25px" v-model="radio" >
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
              <el-checkbox v-model="initializeavarage" label="Initialize with the average face"></el-checkbox>
            </div>
          </div>
          <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 1px;font-size: 13px">
            Random Seed:
          </div>
          <el-input-number
              v-model="randomseed"
              style="margin-left: 15px;margin-top: 10px;width: 90%"
              @change="handleChange"
              :min="1"
              label="描述文字"
          ></el-input-number>
          <div style="margin-left: 25px;margin-top: 8px; margin-bottom: 2px;font-size: 13px">
            Style Scale
          </div>
          <el-input-number
              v-model="stylescale"
              style="margin-left: 15px; margin-top: 10px;width: 90%"
              :precision="2"
              :step="0.01"
              :max="1"
              :min="-1"
          ></el-input-number>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span style="font-size: 15px">Advanced Settings</span>
        </template>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Regression Model
        </div>
        <div style="margin-left: 25px">
          <el-radio v-model="regression" label="1">lr</el-radio>
          <el-radio v-model="regression" label="2">svr</el-radio>
        </div>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Direction Type
        </div>
        <div style="margin-left: 25px">
          <el-radio v-model="direction" label="1">z</el-radio>
          <el-radio v-model="direction" label="2">w</el-radio>
        </div>
        <div style="margin-left: 25px;margin-top: 5px;font-size: 13px">
          <div>
            <el-checkbox v-model="apofg" label="Allow projection on FaceGen"></el-checkbox>
          </div>
        </div>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Projection Steps
        </div>
        <el-input-number
            v-model="steps"
            style="margin-left: 15px;margin-top: 10px;width: 90%"
            @change="handleChange"
            :min="1"
            label="描述文字"
        ></el-input-number>
        <div style="margin-left: 25px;margin-top: 5px;font-size: 13px">
          <div>
            <el-checkbox v-model="feature" label="Display estimated feature values."></el-checkbox>
          </div>
        </div>
        <div style="margin-left: 25px;margin-top: 3px;font-size: 13px">
          <div>
            <el-checkbox v-model="dir_pos" label="Display direction pos/neg buttons."></el-checkbox>
          </div>
        </div>
        <div>
          <el-button style="margin-left: 20px ; width: 90% ; font-size: 14px"  type="info" plain>Reset direction pos/neg</el-button>
        </div>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Tool to modify feature values
        </div>
        <el-radio-group style="margin-left: 25px" v-model="modifyfeature" >
          <el-radio :label="1">Slider</el-radio>
          <el-radio :label="2">Number</el-radio>
        </el-radio-group>
        <div style="margin-left: 25px;margin-top: 8px ; margin-bottom: 5px;font-size: 13px">
          Disentangle
        </div>
        <el-radio-group style="margin-left: 25px" v-model="disentangle" >
          <el-radio :label="1">Automatic</el-radio>
          <el-radio :label="2">Manual</el-radio>
        </el-radio-group>
      </el-sub-menu>

      <div style="margin-left: 20px ; margin-top: 20px ;font-size: 20px">Features</div>
      <div style="margin-left: 20px; margin-top: 10px"><el-button size="medium">Reset</el-button></div>
      <div style="margin-left: 25px;margin-top: 17px ; font-size: 11px">
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
          <el-slider v-model="value1" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">gender</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value2" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">african</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value3" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">eastAsian</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value4" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">southAsian</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value5" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">european</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <span style="font-size: 15px">FaceGen:Detail</span>
        </template>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Cheeks Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value1" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Circle Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value2" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Flushed / Pale</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value3" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Goatee Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value4" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value5" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard - Moustache Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Brow Ridge - forward axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value7" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Brow Ridge - high / low</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value8" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Brow Ridge Inner - down / up</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value9" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Brow Ridge Outer - up / down</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value10" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheek Blush - Light / Red</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value11" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheekbones - low / high</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value12" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheekbones - protrusion asymmetry</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheekbones - shallow / pronounced</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheekbones - thin / wide</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheeks - concave / convex</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Cheeks - round / gaunt</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - chin axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - forward / backward</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - forward axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - pronounced / recessed</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - retracted / jutting</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - shallow / deep</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - small / large</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - tall / short</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - transverse shift</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Chin - wide / thin</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eye Sockets - Bruised / Bright</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eye Sockets - Dark / Light</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eye Whites - Dim / Bright</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Dark / Light</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Low / High</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Lower Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Outer Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Thick / Thin</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Underneath Inner Lightness Fix Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Underneath Lightness Fix Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Upper Dark / Light</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Very Thin / Thick</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyelids - Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyebrows - Very Thin / Thick</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyelids - Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyelids - Pale / Red</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyeliner - Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - Dark Brown / Light Blue</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - Dark Brown / Light Brown</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - apart / together</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - down / up</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - height disparity</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - small / large</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - tilt inward / outward</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyes - transverse shift</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyeshadow - Light / Dark</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - brow-nose-chin ratio</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - coronal bend</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - coronal shear</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - forehead-sellion-nose ratio</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - heavy / light</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - round / gaunt</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - tall / short</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - up / down</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - vertical axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Face - wide / thin</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Forehead - forward axis twist</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Forehead - small / large</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Forehead - tall / short</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Forehead - tilt forward / back</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Head - thin / wide</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Jaw - retracted / jutting</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Jaw - wide / thin</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Jaw-Neck - slope high / low</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Jawline - concave / convex</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Lips - Flushed / Pale</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Lipstick - Dark Blue / Light Red</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Lipstick - Dark Red / Light Blue</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - Lips deflated / inflated</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - Lips large / small</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - Lips puckered / retracted</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - Lips thin / thick</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mouth - corners transverse shift</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
      </el-sub-menu>

      <el-sub-menu index="5">
        <template #title>
          <span style="font-size: 15px">AWS:General</span>
        </template>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Age</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value1" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Gender</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value2" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Beard</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value3" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Mustache</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value4" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Smile</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value5" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">EyesOpen</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">MouthOpen</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Eyeglasses</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Sunglasses</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Pose_Yaw</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Pose_Roll</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Quality_Brightness</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Quality_Sharpness</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value6" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
      </el-sub-menu>

      <el-sub-menu index="6">
        <template #title>
          <span style="font-size: 15px">AWS:Emotion</span>
        </template>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_ANGRY</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value1" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_DISGUSTED</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value2" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_CONFUSED</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value3" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_SURPRISED</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value4" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
        <div style="margin-left: 20px; margin-top: 5px; font-size: 13px">Emotion_FEAR</div>
        <div class="block" style="margin-left: 20px; margin-top: 8px; margin-right: 20px">
          <el-slider v-model="value5" :format-tooltip="formatTooltip" :step="0.01" input-size="mini"> </el-slider>
        </div>
        <div class="featurename" style="margin-left: 18px">-10.00</div> <div class = "featurename" style="margin-left: 180px">10.00</div>
      </el-sub-menu>
      <div style="margin-left: 20px; margin-bottom: 10px">
        <el-button style="width: 250px" size="medium ">Submit</el-button>
      </div>
    </el-menu>
  </div>
  <!--  </el-scrollbar>-->
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: "Aside",
  data(){
    return{
      value1: 50,
      value2: 50,
      value3: 50,
      value4: 50,
      value5: 50,
      value6: 50,
      value7: 50,
      value8: 50,
      value9: 50,
      value10: 50,
      value11: 50,

      isCollapse: true,

      radio : 2,
      regression : '1',
      direction : '2',
      initializeavarage : false,
      apofg : true,
      stylescale : 1.00,
      randomseed : 205,
      steps : 1000,
      feature:true,
      dir_pos:false,
      modifyfeature : 2,
      disentangle : 2,
    }
  },
  methods:{
    formatTooltip(val){
      return (((val -50 ))/ 5).toFixed(2)
    },
    handleOpen(key, keyPath){
      console.log(key, keyPath)
    },
    handleClose(key, keyPath){
      console.log(key,keyPath)
    }
  }
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

