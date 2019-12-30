<template>
    <div>
        <Tabs>
            <TabPane label="首页"></TabPane>
            <TabPane v-for="(tab,index) in tabs" :key="index" closable :label="tab.title"></TabPane>
        </Tabs>
    </div>
</template>