

export const wsrProxy={
	port:0,                // 电脑端口号，可以是USB-HID，也可以是串口号
	baud:57600,            // 串口波特率
	
	proxy_ip:"127.0.0.1",  // IP地址
	proxy_port:35225,       // IP 端口号
	get_full:"",           // http网址
	ret:-1,                // 返回值

	MSG_GETCARDNO : 1024 + 1000, // 监控到数据上传返回的消息值

	MODE_CARDTYPE   :1,    // 卡型：         0-M1（S50）卡  1-M1 (S70)卡   20-ID卡   30-磁卡   40-扫描枪 
	MODE_CARDSEQ    :2,    // 卡号顺序       0-默认顺序(默认)         1-反顺序
	MODE_DATATYPE   :3,    // 数据格式       0-char（默认）           1-Hex
	MODE_TIMEOUT    :4,    // 通讯超时       默认200ms    范围：30 - 1000ms
	MODE_COMMAND    :5,    // 命令类型       0-高级命令               1-单步命令(默认)
	MODE_MULTI_PORT :6,    // 端口模式       0-单端口单设备（默认）   1-多端口多设备
	MODE_REQUEST    :7,    // 寻卡模式       0-IDLE（默认）           1-ALL
	//MODE_TIME_IN_WR :14,   // 发送和接收数据之间时间间隔       默认20ms    范围：10 - 200ms
	
	client_datatype :0,    // 数据格式       0-char（默认）           1-Hex

    get_prefix:function(){
		return "http://"+this.proxy_ip+":"+this.proxy_port+"/wsr:";
	},

	init:function(){
		this.client_datatype = 0;
		$.base64.utf8encode = true;
		jQuery.support.cors = true;
		$.ajaxSetup({ 
			async : false ,
			cache : false ,
			timeout : 1000 
                        
		}); 
		//this.ws_set_mode(this.MODE_TIMEOUT,500);		
	},

	//--------------------------
	// 辅助函数
	//--------------------------
	// 获取 wsrProxy.js 信息

	//-------------------------------------------------------------- 
	// 版本：V0.19
	// 日期：20190806
	//
	// 1.新增对ID读卡设备工作模式相关函数的支持：
	//     ws_set_id_mode     ws_get_id_mode
	// 2.新增对扫描设备的支持;
	// 3.新增监控消息变量 MSG_GETCARDNO;
	// 4.取消在函数 ws_monitor_begin 中传递句柄值;

	//-------------------------------------------------------------- 
	// 版本：V0.18
	// 日期：20190726
	//
	// 修正无法发送蓝牙透传命令函数 ws_sr_data 的问题


	//-------------------------------------------------------------- 
	// 版本：V0.17
	// 日期：20190717
	//
	// 修正了监控相关的四个函数在脚本中的错误声明:
	//     ws_monitor_begin      ws_monitor_end  
	//     ws_monitor_getstatus  ws_monitor_setmessage 

	//-------------------------------------------------------------- 
	// 版本：V0.16
	// 日期：20190516
	//
	// 在 init 中 去除 ws_set_mode 设置通讯超时代码：
	//    this.ws_set_mode(this.MODE_TIMEOUT,500);		
	// 因客户在用localhost本地测试时发现该命令在网页加载时会造成耗时9秒多的异常，其它部分时，耗时时间正常

	//-------------------------------------------------------------- 
	// 版本：V0.15
	// 日期：20190126
	//
	// 默认IP 端口号由 5225改为 35225



	//-------------------------------------------------------------- 
	// 版本：V0.14
	// 日期：20181223
	//
	// 新增对多设备通讯的支持函数：  ws_get_dev_usbcount ws_set_dev_usbindex ws_get_dev_usbindex 
	// 新增对单串口多设备监控函数：  ws_monitor_begin      ws_monitor_end  
	//                          ws_monitor_getstatus  ws_monitor_setmessage 


	// 版本：V0.13
	// 日期：20181222
	//
	// 新增对 ISO15693 电子标签的支持

	// 版本：V0.12
	// 日期：20181203
	//
	// 新增对 ISO15693 电子标签的支持
	
	// 版本：V0.11
	// 日期：20181123
	//
	// 新增函数 ws_getCardNo_ex 获取ISO14443 所有类型卡的卡号，卡号长度可变
	//

	// 版本：V0.10
	// 日期：20181108
	//
	// 新增函数 ws_set_device_default_mode ，ws_get_device_default_mode
	//
	
	// 版本：V0.09
	// 日期：20180917
	//
	// 1.ws_getWsrProxyInfo 接收代理服务程序是32位还是64位程序标志值
	// 2.ws_loadKey/ws_loakKeyE/ws_verifyKey/ws_verifyKeyE/ws_changeKey，以Base64编码方式传递数据
	// 3.修正 ws_readValue 中一处BUG 	
	//

	//--------------------------------------------
	//
	// 版本：V0.08
	// 日期：20180911
	//
	// 1.取消对 ws_readData,ws_readSector,ws_writeData,ws_writeSector 函数的支持
	// 2.通过设置client_datatype， ws_readBlock  ws_writeBlock 可以以两种方式传递数据
	//   

	
	//--------------------------------------------
	//
	// 版本：V0.07
	// 日期：20180909
	//
	// 新增函数 getBytes ，getBytesStr


	//--------------------------------------------
	//
	// 版本：V0.06
	// 日期：20180906
	//
	// 1.对透传函数 ws_sr_data 增加超时时间为1000ms;
	// 2.对其他通讯函数，增加超时时间为200ms;
	// 3.去除模式 MODE_TIME_IN_WR;
	// 4.修正函数 ws_sr_data 内部调用对象体 wsrProxy 其他函数，
	//   对 wsrProxy 内的公共变量 ret 都发生影响，造成 ws_sr_data 返回值异常的情况;
	// 5.函数 ws_sr_data 中传输的数据，在内部先转换为16进制再通过http传输，
	//   避免特殊字符在传输过程中被转义;
	// 6.新增两个转换函数:  c2h(字符串转16进制)  h2c(16进制转字符串)
	
	
	//--------------------------------------------
	//
	// 版本：V0.05
	// 日期：20180905
	//
	// 1.规范js代码；
	// 2.修正 ws_get_mode 函数 参数错误；
	
	//--------------------------------------------
	//
	// 版本：V0.04
	// 日期：20180902
	//
	// 扩大对IE浏览器版本支持范围，现支持 IE 6+
	
	// 版本：V0.03
	// 日期：20180901
	//
	// 支持数据透传函数 ws_sr_data
	//
	// 版本：V0.02
	// 日期：20180829
	//
	// 1.释放 proxy_ip 和 proxy_port 两个参数，可以在网页中设置，
	//     以适应 wsrProxy 相关参数的改变。
	// 2.新增 ws_verifyKey(E) 验证密码
	//
	//--------------------------------------------
	// 版本：V0.01
	// 日期：20180806
	//
	// 1.创建与 WSR Proxy交互的基础 js代码
	// 2.支持 ISO14443 TYPEA S50/S70
	// 3.支持 ISO14443 TYPEB 二代身份证
	// 
	
	ws_getWsrJsInfo:function(obj){
		obj.version=0.19;
		obj.builddate=20190806;
        ret=1;
		return ret;
	},
	// 获取 dll 信息
	ws_getDLLInfo:function(obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_getDLLInfo"+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  obj.version=data.dll_version;
			  obj.builddate=data.dll_builddate;
			  ret=1;
			}
		);
		return ret;
	},
	// 获取 wsrProxy 信息
	ws_getWsrProxyInfo:function(obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_getWsrProxyInfo"+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  obj.version=data.proxy_version;
			  obj.builddate=data.proxy_builddate;
			  obj.isApp64=data.isApp64;
			  ret=1;
			}
		);
		return ret;
	},

	//--------------------------
	// 通讯相关
	//--------------------------
	// 设置串口波特率
	ws_setBaud:function(port,baud){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_setBaud,"+port+","+baud+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 获取串口波特率
	ws_getBaud:function(port,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_getBaud,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.baud=data.baud;
			}
		);
		return ret;
	},
    // 打开端口
	ws_openPort:function(port){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_openPort,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
				this.ret=data.rt;
			}
		);
		return this.ret;
	},
	// 关闭端口
	ws_closePort:function(port){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_closePort,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			}
		);
		return this.ret;
	},
	// 点名
	ws_callDevice:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_callDevice,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	ws_callDeviceE:function(port,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_callDeviceE,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.model=data.dev_model;
			  obj.cputype=data.dev_cputype;
			  obj.version=data.dev_version;
			}
		);
		return ret;
	},
	// 蜂鸣
	ws_beep:function(port){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_beep,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			}
		);
		return this.ret;
	},
	ws_beepex:function(port,delaytime){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_beepex,"+port+","+delaytime+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			}
		);
		return this.ret;
	},
	// 设置机号
	ws_setNumber:function(port,number){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_setNumber,"+port+","+number+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 获取设备唯一序列号
	ws_get_dev_id:function(port,obj){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_get_dev_id,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			  obj.id=data.dev_id;
			}
		);
		return this.ret;
	},
	// 获取设备详细信息
	ws_get_dev_info:function(port,obj){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_get_dev_info,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			  obj.info=data.dev_info;
			}
		);
		return this.ret;
	},
	// 复位芯片
	ws_reset:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_reset,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 设置设备操作卡型
	ws_set_device_mode:function(port,mode){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_set_device_mode,"+port+","+mode+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 读取设备操作卡型
	ws_get_device_mode:function(port,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_get_device_mode,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.mode=data.mode;
			}
		);
		return ret;
	},
	// 设置设备上电默认操作卡型
	ws_set_device_default_mode:function(port,mode){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_set_device_default_mode,"+port+","+mode+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 读取设备上电默认操作卡型
	ws_get_device_default_mode:function(port,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_get_device_default_mode,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.mode=data.mode;
			}
		);
		return ret;
	},

	//--------------------------
	// 显示屏
	//--------------------------
	// 显示文本
	ws_displayText:function(port,lineno,length,text){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_displayText,"+port+","+lineno+","+length+","+text+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 清屏
	ws_clearText:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_clearText,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	
	//--------------------------
	// 环境设置
	//--------------------------
	// 设置接口库工作模式
	ws_set_mode:function(mark_mode,mode){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_set_mode,"+mark_mode+","+mode+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			}
		);
		return this.ret;
	},
	// 读取接口库工作模式
	ws_get_mode:function(mark_mode,obj){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_get_mode,"+mark_mode+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			  obj.mode=data.mode;
			}
		);
		return this.ret;
	},

	//--------------------------
	// ID读卡设备(125KHZ)
	//--------------------------
	// 设置ID读卡设备工作模式
	ws_set_id_mode:function(port,mode){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_set_id_mode,"+port+","+mode+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 读取ID读卡设备工作模式
	ws_get_id_mode:function(port,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_get_id_mode,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.mode=data.mode;
			}
		);
		return ret;
	},

	//--------------------------
	// ISO14443A S50/S70
	//--------------------------
    // 休眠卡
	ws_halt:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_halt,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
    // 读取卡号 
	ws_getCardNo_DWORD:function(port,obj){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_getCardNo_DWORD,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			  obj.cardno=data.cardno>>>0;
			}
		);
		return this.ret;
	},
	ws_getCardNo_Double:function(port,obj){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_getCardNo_Double,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			  obj.cardno=data.cardno;
			}
		);
		return this.ret;
	},
	ws_getCardNo_String:function(port,obj){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_getCardNo_String,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			  this.obj.cardno=data.cardno;
			}
		);
		return this.ret;
	},
	ws_getCardNo_Hex:function(port,obj){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_getCardNo_Hex,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  this.ret=data.rt;
			  obj.cardno=data.cardno;
			}
		);
		return this.ret;
	},
	ws_getCardNo_ex:function(port,obj){
		this.ret=-1;
		this.get_full=this.get_prefix()+"ws_getCardNo_ex,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
				this.ret=data.rt;
				obj.cardtype=data.cardtype;
				obj.cardbytes=data.cardbytes;
			  obj.cardno=data.cardno;
			}
		);
		return this.ret;
	},


	//--------------------------
	// 读写卡
	//--------------------------

	// 装载密码
	ws_loadKey:function(port,key,keytype){
		ret=-1;
		var tmpdata = this.toBase64(port+","+key+","+keytype);
		this.get_full=this.get_prefix()+"ws_loadKey,"+tmpdata+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	ws_loadKeyE:function(port,key,keytype){
		ret=-1;
		var tmpdata = this.toBase64(port+","+key+","+keytype);
		this.get_full=this.get_prefix()+"ws_loadKeyE,"+tmpdata+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 验证密码
	ws_verifyKey:function(port,key,keytype,sector){
		ret=-1;
		var tmpdata = this.toBase64(port+","+key+","+keytype+","+sector);
		this.get_full=this.get_prefix()+"ws_verifyKey,"+tmpdata+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	ws_verifyKeyE:function(port,key,keytype,sector){
		ret=-1;
		var tmpdata = this.toBase64(port+","+key+","+keytype+","+sector);
		this.get_full=this.get_prefix()+ "ws_verifyKeyE,"+tmpdata +","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},

	// 修改密码
	ws_changeKey:function(port,sector,newkeya,newac,newkeyb){
		ret=-1;
		var tmpdata = this.toBase64(port+","+sector+","+newkeya+","+newac+","+newkeyb);
		this.get_full=this.get_prefix()+"ws_changeKey,"+tmpdata+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 读块数据
	ws_readBlock:function(port,block,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_readBlock,"+port+","+block+","+this.client_datatype+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.data=data.data;
			}
		);
		obj.data = this.fromBase64(obj.data);
		return ret;
	},
	/*
	// 连续读数据
	ws_readData:function(port,block,obj,len){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_readData,"+port+","+block+","+len+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.data=data.data;
			}
		);
		return ret;
	},
	// 读扇区数据
	ws_readSector:function(port,sector,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_readSector,"+port+","+sector+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.data=data.data;
			}
		);
		return ret;
	},*/
	// 写块数据
	ws_writeBlock:function(port,block,data){
		ret=-1;
		var tmpdata = this.toBase64(data);
		this.get_full=this.get_prefix()+"ws_writeBlock,"+port+","+block+","+this.client_datatype+tmpdata+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	/*
	// 连续写数据
	ws_writeData:function(port,block,data,len){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_writeData,"+port+","+block+","+data+","+len+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 写扇区数据
	ws_writeSector:function(port,sector,data){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_writeSector,"+port+","+sector+","+data+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},*/

	//--------------------------
	// 电子钱包
	//--------------------------

	// 初始化值
	ws_initValue:function(port,block,value){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_initValue,"+port+","+block+","+value+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 读值
	ws_readValue:function(port,block,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_readValue,"+port+","+block+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.value=data.value;
			}
		);
		return ret;
	},
	// 增值
	ws_incValue:function(port,block,value){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_incValue,"+port+","+block+","+value+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 减值
	ws_decValue:function(port,block,value){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_decValue,"+port+","+block+","+value+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},

	//--------------------------
	// ISO14443B
	//--------------------------

	// 获取二代身份证卡号
	ws_iso14443b_get_uid_2:function(port,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso14443b_get_uid_2,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.uid=data.uid;
			  obj.len=data.len;
			}
		);
		return ret;
	},

	//--------------------------
	// ISO15693
	//--------------------------

	// 设置工作模式
	ws_iso15693_setFlag:function(port,flag_select,flag_address,flag_tagType){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_setFlag,"+port+","+flag_select+","+flag_address+","+flag_tagType+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 读取工作模式
	ws_iso15693_getFlag:function(port,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_getFlag,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
				obj.flag_select=data.flag_select;
				obj.flag_address=data.flag_address;
				obj.flag_tagType=data.flag_tagType;
			}
		);
		return ret;
	},
	// 设置操作标签
	ws_iso15693_setUID:function(port, uid){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_setUID,"+port+","+uid+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},

	// 检索标签
	ws_iso15693_getTags:function(port, obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_getTags,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
				obj.uids=data.uids;
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 获取标签信息
	ws_iso15693_getTagInfo:function(port, obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_getTagInfo,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
				obj.uid=data.uid;
				obj.flag_memory=data.flag_memeory;
				obj.block_count=data.block_count;
				obj.block_size=data.block_size;
			  ret=data.rt;
			}
		);
		return ret;
	},
	ws_iso15693_getTagInfoE:function(port, obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_getTagInfoE,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
				obj.flag_dsfid=data.flag_dsfid;
				obj.flag_afi=data.flag_afi;
				obj.flag_memory=data.flag_memory;
				obj.flag_producer=data.flag_producer;

				obj.uid=data.uid;
				obj.dsfid=data.dsfid;
				obj.afi=data.afi;
				obj.block_count=data.block_count;
				obj.block_size=data.block_size;
				
				ret=data.rt;
			}
		);
		return ret;
	},

	// 选定标签
	ws_iso15693_select:function(port, uid){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_select,"+port+","+uid+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 复位标签
	ws_iso15693_reset:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_reset,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 休眠标签
	ws_iso15693_quiet:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_quiet,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},

	// 读块数据
	ws_iso15693_readBlock:function(port,block,block_count,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_readBlock,"+port+","+block+","+block_count+","+this.client_datatype+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.data=data.data;
			}
		);
		obj.data = this.fromBase64(obj.data);
		return ret;
	},
	ws_iso15693_readBlockE:function(port,block,block_count,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_readBlockE,"+port+","+block+","+block_count+","+this.client_datatype+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
				obj.data=data.data;
				obj.status=data.status;
			}
		);
		obj.data = this.fromBase64(obj.data);
		obj.status = this.fromBase64(obj.status);
		return ret;
	},

	// 写块数据
	ws_iso15693_writeBlock:function(port,block,block_count,data){
		ret=-1;
		var tmpdata = this.toBase64(data);
		this.get_full=this.get_prefix()+"ws_iso15693_writeBlock,"+port+","+block+","+block_count+","+this.client_datatype+tmpdata+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 锁定块
	ws_iso15693_lockBlock:function(port, block){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_lockBlock,"+port+","+block+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 写AFI标志
	ws_iso15693_writeAFI:function(port,afi){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_writeAFI,"+port+","+afi+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 锁定AFI标志
	ws_iso15693_lockAFI:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_lockAFI,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 写DSFID标志
	ws_iso15693_writeDSFID:function(port,dsfid){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_writeDSFID,"+port+","+dsfid+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 锁定DSFID标志
	ws_iso15693_lockDSFID:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_iso15693_lockDSFID,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},


	//--------------------------
	// 多设备通讯
	//--------------------------
	
	// 多HID设备
	//=======================
	// 获取设备总数量
	ws_get_dev_usbcount:function(){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_get_dev_usbcount,"+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 设置准备操作的设备索引号
	ws_set_dev_usbindex:function(index){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_set_dev_usbindex,"+index+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 获取当前操作的设备索引号
	ws_get_dev_usbindex:function(){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_get_dev_usbindex,"+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	
	//--------------------------
	// 单串口多设备
	//--------------------------
	
	// 监控开始
	ws_monitor_begin:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_monitor_begin,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 监控结束
	ws_monitor_end:function(){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_monitor_end,"+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 获取监控状态
	ws_monitor_getstatus:function(){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_monitor_getstatus,"+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	// 设置刷卡消息值
	ws_monitor_setmessage:function(message){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_monitor_setmessage,"+message+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},
	
	//--------------------------
	// 扫描设备
	//--------------------------
	
	// 打开扫描设备
	ws_openScanner:function(port,baud,message){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_openScanner,"+port+","+baud+","+message+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},

	// 关闭扫描设备
	ws_closeScanner:function(port){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_closeScanner,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			}
		);
		return ret;
	},

	// 获取扫描数据
	ws_getBarcode:function(port,obj){
		ret=-1;
		this.get_full=this.get_prefix()+"ws_getBarcode,"+port+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  obj.barcode=data.barcode;
			  if (data.rt<0)
			  {
				  ret=data.rt;
			  }
			  ret=data.rt;
			}
		);
		return ret;
	},


	//--------------------------
	// 蓝牙数据透传
	//--------------------------
	ws_sr_data:function(port,obj){
		var ret=-1;
		var tmpobj={mode:0};
		
		this.ws_get_mode(this.MODE_TIMEOUT,tmpobj);
		this.ws_set_mode(this.MODE_TIMEOUT,1000);
		
//		obj.data=this.c2h(obj.data);
		var tmpdata = this.toBase64(obj.data);
		this.get_full=this.get_prefix()+"ws_sr_data,"+port+","+obj.len+","+tmpdata+","+(new Date()).getTime();
		$.getJSON(this.get_full,
			function(data){
			  ret=data.rt;
			  obj.len=data.len;
			  obj.data=data.data;
			}
		);
		this.ws_set_mode(this.MODE_TIMEOUT,tmpobj.mode);
		
		return ret;
	},
	
	// 获取字符串长度（含中文，汉字占2个字节）
	getBytes : function (str){
		
        var byteSize = 0, code = 0;
		
		for (var i = 0; i < str.length; i++) {
			code = str.charCodeAt(i);

			if (code <= 0xff) 
				byteSize += 1;
			else 
				byteSize += 2;
		}
		
		return byteSize;
						
	},
	// 获取指定长度字符串（含中文，一个汉字最大占用3个字节）
	getBytesStr : function (str , maxbytes){
		
        var byteSize = 0, totalBytes = 0;
		var tmpstr = "";
		
		for (var i = 0; i < str.length; i++) {
			var code = str.charCodeAt(i);
			
			if (0x00 <= code && code <= 0xff) 
				byteSize = 1;
			else 
				byteSize = 2;
			
			if (( byteSize + totalBytes ) > maxbytes ) break;
			tmpstr += str[i];
			totalBytes += byteSize;
		}
		
		return tmpstr;
	},	
	
	// string to Base64
	toBase64:function (str){
		var tmpstr = $.base64.encode(str,false);// $.base64.atob(str,true);
		return tmpstr;
	},
	// Base64 to string
	fromBase64:function (str) {
		var tmpstr = $.base64.decode(str,true);//$.base64.btoa(str);
		return tmpstr;
	}
	
};

/*!
 * jquery.base64.js 0.0.3 - https://github.com/yckart/jquery.base64.js
 * Makes Base64 en & -decoding simpler as it is.
 *
 * Based upon: https://gist.github.com/Yaffle/1284012
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/10
 **/
;(function($) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        a256 = '',
        r64 = [256],
        r256 = [256],
        i = 0;

    var UTF8 = {

        /**
         * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
         * (BMP / basic multilingual plane only)
         *
         * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
         *
         * @param {String} strUni Unicode string to be encoded as UTF-8
         * @returns {String} encoded string
         */
        encode: function(strUni) {
            // use regular expressions & String.replace callback function for better efficiency
            // than procedural approaches
            var strUtf = strUni.replace(/[\u0080-\u07ff]/g, // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
            function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
            })
            .replace(/[\u0800-\uffff]/g, // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
            function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
            });
            return strUtf;
        },

        /**
         * Decode utf-8 encoded string back into multi-byte Unicode characters
         *
         * @param {String} strUtf UTF-8 string to be decoded back to Unicode
         * @returns {String} decoded string
         */
        decode: function(strUtf) {
            // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
            var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
            function(c) { // (note parentheses for precence)
                var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
                return String.fromCharCode(cc);
            })
            .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
            function(c) { // (note parentheses for precence)
                var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                return String.fromCharCode(cc);
            });
            return strUni;
        }
    };

    while(i < 256) {
        var c = String.fromCharCode(i);
        a256 += c;
        r256[i] = i;
        r64[i] = b64.indexOf(c);
        ++i;
    }

    function code(s, discard, alpha, beta, w1, w2) {
        s = String(s);
        var buffer = 0,
            i = 0,
            length = s.length,
            result = '',
            bitsInBuffer = 0;

        while(i < length) {
            var c = s.charCodeAt(i);
            c = c < 256 ? alpha[c] : -1;

            buffer = (buffer << w1) + c;
            bitsInBuffer += w1;

            while(bitsInBuffer >= w2) {
                bitsInBuffer -= w2;
                var tmp = buffer >> bitsInBuffer;
                result += beta.charAt(tmp);
                buffer ^= tmp << bitsInBuffer;
            }
            ++i;
        }
        if(!discard && bitsInBuffer > 0) result += beta.charAt(buffer << (w2 - bitsInBuffer));
        return result;
    }

    var Plugin = $.base64 = function(dir, input, encode) {
            return input ? Plugin[dir](input, encode) : dir ? null : this;
        };

    Plugin.btoa = Plugin.encode = function(plain, utf8encode) {
        plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
        plain = code(plain, false, r256, b64, 8, 6);
        return plain + '===='.slice((plain.length % 4) || 4);
    };

    Plugin.atob = Plugin.decode = function(coded, utf8decode) {
        coded = coded.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        coded = String(coded).split('=');
        var i = coded.length;
        do {--i;
            coded[i] = code(coded[i], true, r64, a256, 6, 8);
        } while (i > 0);
        coded = coded.join('');
        return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded;
    };
}(jQuery));
