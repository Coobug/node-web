<template>
  <page-layout class="home-container">
    <div slot="main">
      <a-carousel class="home-container-banner" arrows autoplay v-if="banners.length > 0">
        <div slot="prevArrow" class="home-slick-arrow home-slick-arrow__left" style="left: 0">
          <a-icon type="left" />
        </div>
        <div slot="nextArrow" class="home-slick-arrow home-slick-arrow__right" style="right: 0">
          <a-icon type="right" />
        </div>
        <div class="home-container-banner__item media-banner" v-for="(item, index) in banners" :key="index">
          <a :href="item.goUrl || 'javascript:;'" target="_blank">
            <img :src="item.cover" />
          </a>
        </div>
      </a-carousel>
      <div class="home-container-hd" v-if="notice.length > 0">
        <div class="home-container-hd__alert">
          新的公告！
        </div>
      </div>
      <div class="home-container-list">
        <list-item
          :loading="loading"
          :load-more="hasNextPage"
          :data-source="listData"
          @more="hadleLoadMore"
        />
      </div>
    </div>
    <!-- 左侧 -->
    <div slot="aside">
      <div class="page-aside">
        <h2 class="page-aside__title">热门标签</h2>
        <a-skeleton :loading="loading" active>
          <aside-tag />
        </a-skeleton>
      </div>
      <div class="page-aside">
        <h2 class="page-aside__title">文章分类</h2>
        <a-skeleton :loading="loading" active>
          <aside-category />
        </a-skeleton>
      </div>
      <div class="page-aside">
        <h2 class="page-aside__title">热门文章</h2>
        <a-skeleton :loading="loading" active>
          <aside-article />
        </a-skeleton>
      </div>
    </div>
  </page-layout>
</template>

<script>
import listItem from 'components/list/listItem'
import pageLayout from 'components/common/PageLayout'
import asideArticle from 'components/aside/AsideArticle'
import asideCategory from 'components/aside/AsideCategory'
import asideTag from 'components/aside/AsideTag'
import { getBanner } from 'api/common'
import { getArticleRecommend } from 'api/article'

export default {
  components: {
    listItem,
    pageLayout,
    asideArticle,
    asideCategory,
    asideTag
  },
  data() {
    return {
      loading: true,
      notice: []
    }
  },
  async asyncData({ store, error }) {
    try {
      const {
        data: { data }
      } = await getBanner()
      const {
        data: {
          data: { items, hasNextPage, next }
        }
      } = await getArticleRecommend()

      return {
        loading: false,
        listData: items,
        hasNextPage,
        nextPage: next,
        banners: data
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  methods: {
    hadleLoadMore(list) {
      getArticleRecommend({
        page: this.nextPage
      })
        .then(res => {
          const { items, hasNextPage, next } = res.data.data
          this.hasNextPage = hasNextPage
          this.nextPage = next
          this.listData = list.concat(items)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
@arrowHeight: 52px;

.home-box-show {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.home-slick-arrow {
  display: none !important;
  width: @arrowHeight - 20;
  line-height: @arrowHeight;
  height: @arrowHeight;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  margin-top: -@arrowHeight / 2;
  opacity: 0.7;
  color: #fff;
  font-size: 20px;

  &::before {
    content: '';
  }

  &__left {
    border-top-right-radius: @radiusBase;
    border-bottom-right-radius: @radiusBase;
  }

  &__right {
    border-top-left-radius: @radiusBase;
    border-bottom-left-radius: @radiusBase;
  }

  &:hover {
    opacity: 1;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.home-container {
  &-banner {
    .home-box-show;
    border-radius: @radiusSmall;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 30px;

    &__item {
      height: 240px;
      margin-bottom: -4px;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }

  &-hd {
    position: relative;
    height: 40px;
    line-height: 40px;
    margin-bottom: @gap;

    & > h2 {
      font-size: 16px;
      line-height: 40px;
      color: @colorText;
      font-weight: bold;
      display: inline-block;
    }

    &__alert {
      float: right;
      max-width: 350px;
      padding: 0 20px;
      color: #6b3612;
      background-color: #fff7e7;
      border-radius: 40px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>

<style lang="less">
.slick-slider {
  &:hover {
    .home-slick-arrow {
      display: block !important;
    }
  }
}
</style>
