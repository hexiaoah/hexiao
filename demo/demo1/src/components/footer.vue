<template>
    <div class="footer" id="footer">
        <div class="footer-row footer-nav">
            <a class="footer-nav-item" href="http://www.2dfire.com">{{office}}</a>
            <a class="footer-nav-item" href="#">{{open}}</a>
        </div>
        <div class="footer-row ">
            <span class="footer-desc">{{copyright}}</span>
        </div>
    </div>
</template>
<script>
    import _i from '@/i18n/index';

    let pageData = {
        copyright: _i('FOOTER.DESC.COPYRIGHT'),
        office: _i('FOOTER.NAV.OFFICE'),
        open: _i('FOOTER.NAV.OPEN')
    };

    export default {
        data() {
            return pageData;
        }
    };
</script>
<style lang="scss" scoped>
    .footer {
        height: 50px;
        line-height: 50px;
        background-color: #2F2F2F;
        position: relative;
        z-index: 3;
        width: 100%;
        padding: 9px 0 5px 0;

        .footer-row {
            height: 17px;
            line-height: 17px;
            text-align: center;
            color: #FFFFFF;

            .footer-desc {
                font-size: 10px;
            }
        }
        .footer-nav {
            margin-bottom: 2px;
            a.footer-nav-item {
                color: #FFFFFF;
                padding: 0 15px;
                font-size: 10px;

                border-right: 1px solid rgba(255, 255, 255, 0.2);
                &:last-child {
                    border-right: 0;
                }

                &:hover {
                    color: #f55f4f;
                }
            }
        }
    }
</style>


