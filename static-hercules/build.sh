#!/usr/bin/env bash

envtype=$1

#git pull
# npm --registry https://registry.npm.taobao.org install

npm install

npm run build NODE_ENV=$envtype

npm run gulp $envtype

# if [ $envtype == 'dev' ] ; then
# 	echo -e "\033[31m 开始上传到日常服务器 \033[0m"
# 	ncftpput -R -v -u dihuo -p dihuo 10.1.6.60 d2/$myPath  release/min/*


# #	echo -e "\033[31m 清除服务器缓存 \033[0m"

# 	echo -e "\033[31m 上传完毕，如有问题联系dabing@2dfire.com \033[0m"
# 	echo -e "\033[31m 如未安装ncftp ， 请先安装。  mac : brew install ncftp \033[0m"
# fi

# 保留打包信息 只用dev pre daily
# if [[ $envtype = 'dev' ]] || [[ $envtype = 'pre' ]] || [[ $envtype = 'daily' ]]; then
#     echo -e "<pre>build at: $(date)\nbranch: $(git rev-parse --abbrev-ref HEAD)\ncommit: $(git log --pretty=oneline -1)</pre>" > ./release/min/build_info.html
# fi
