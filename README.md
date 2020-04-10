
# chat-mini-sdk
JS SDK for NetCloth WebView

## Install
``` npm install ```
``` npm build ```

sdk file path 

``` dist/nchsdk.js```

## Doc

### env

#### getSystemInfo()
get system info,like language

result:
```
{status:0,result:{language:""}}// "zh-cn" Chinese “en" English
```

#### setProxy(host:string,port:int)
```
{status:0,result:{}}
```

#### revertProxy()
```
{status:0,result:{}}
```

#### getProxy()
result:
```
{status:0,result:{host:"string",port:"string"}}
```

### authorize

#### login (icon:string, name:string, publicKey:string, timestamp:string, signature:string)
you can get user signature with this function

params:
```
icon: DApp icon
name: DApp name
publicKey: DApp publicKey
timestamp: Valid for one minute
signature: Sha256(timestamp) to hex
```

result:
```
{"result": {"publicKey":                     "048c8a58291eb9ad6df6d7a80e3913fa126d991ba5e57d62403b123e87a09981bdcfcdfbb5029bc8dbe8828af2fa483cdc4b0f890ba81b4ce698b01431e17fe572",
                        "signature": "f9fa0f8f4e7feae4304ac387814a8882b455df7012410903917210c21c05b15d1c495e658f26722fe38689622fc7f1f61d33ddb1270d043ecb7d110459f62477",
                        "timestamp": "1579245008596"},
                "status": 0}
```

### chat

#### joinGroup(groupID:string)
to join group page

result: 
```
{status:0}
```

## Demo

You can get more info in demo