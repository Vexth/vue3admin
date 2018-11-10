import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface ITagsState {
  visitedViews: any[];
  cachedViews: any[];
}

@Module({ dynamic: true, store, name: 'tags' })
class Tags extends VuexModule implements ITagsState {
  public visitedViews: any = [];
  public cachedViews: any = [];

  @Mutation
  public ADD_VISITED_VIEW(view: any) {
    if (this.visitedViews.some((v: any) => v.path === view.path)) {
      return;
    }

    const vv = Object.assign({}, view, {
      title: view.meta.title || 'no-name',
    });
    this.visitedViews.push(vv);
  }
  @Mutation
  public ADD_CACHED_VIEW(view: any) {
    if (this.cachedViews.includes(view.name)) {
      return;
    }
    if (!view.meta.noCache) {
      this.cachedViews.push(view.name);
    }
  }
  @Mutation
  public DEL_VISITED_VIEW(view: any) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
  }
  @Mutation
  public DEL_CACHED_VIEW(view: any) {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i);
        this.cachedViews.splice(index, 1);
        break;
      }
    }
  }
  @Mutation
  public DEL_OTHERS_VISITED_VIEWS(view: any) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews = this.visitedViews.slice(i, i + 1);
        break;
      }
    }
  }
  @Mutation
  public DEL_OTHERS_CACHED_VIEWS(view: any) {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i);
        this.cachedViews = this.cachedViews.slice(index, index + 1);
        break;
      }
    }
  }
  @Mutation
  public DEL_ALL_VISITED_VIEWS() {
    this.visitedViews = [];
  }
  @Mutation
  public DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = [];
  }
  @Mutation
  public UPDATE_VISITED_VIEW(view: any) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }

  @Action({ commit: 'ADD_VISITED_VIEW' })
  public addVisitedView(view: any) {
    return view;
  }
  @Action({ commit: 'ADD_CACHED_VIEW' })
  public addCachedView(view: any) {
    return view;
  }
  // @MutationAction({mutate: ['visitedViews', 'visitedViews']})
  // public delView(view: any) {
  //   return new Promise((resolve: any) => {
  //     this.delVisitedView(view);
  //     this.delCachedView(view);
  //     resolve({
  //       visitedViews: [...this.visitedViews],
  //       cachedViews: [...this.cachedViews],
  //     });
  //   });
  // }
  @Action({ commit: 'DEL_VISITED_VIEW' })
  public delVisitedView(view: any) {
    return view;
  }
  // @MutationAction({mutate: []})
  // delVisitedView(view: any) {
  //   return new Promise((resolve: any) => {
  //     this.DEL_VISITED_VIEW(view);
  //     resolve([...this.visitedViews]);
  //   });
  // }
  @Action({ commit: 'DEL_CACHED_VIEW' })
  public delCachedView(view: any) {
    return view;
  }
  // @MutationAction({mutate: []})
  // delCachedView(view: any) {
  //   return new Promise((resolve: any) => {
  //     this.DEL_CACHED_VIEW(view);
  //     resolve([...this.cachedViews]);
  //   });
  // }
  @MutationAction({mutate: ['visitedViews', 'visitedViews']})
  public delOthersViews(view: any) {
    return new Promise((resolve: any) => {
      this.delOthersVisitedViews(view);
      this.delOthersCachedViews(view);
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
      });
    });
  }
  // @Action({ commit: 'DEL_OTHERS_VISITED_VIEWS' })
  // public delOthersVisitedViews(view: any) {
  //   return view;
  // }
  @MutationAction({mutate: []})
  public delOthersVisitedViews(view: any) {
    return new Promise((resolve: any) => {
      this.DEL_OTHERS_VISITED_VIEWS(view);
      // commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...this.visitedViews]);
    });
  }
  // @Action({ commit: 'DEL_OTHERS_CACHED_VIEWS' })
  // public delOthersCachedViews(view: any) {
  //   return view;
  // }
  @MutationAction({mutate: []})
  public delOthersCachedViews(view: any) {
    return new Promise((resolve: any) => {
      this.DEL_OTHERS_CACHED_VIEWS(view);
      // commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...this.visitedViews]);
    });
  }
  @MutationAction({mutate: ['visitedViews', 'visitedViews']})
  public delAllViews(view: any) {
    return new Promise((resolve: any) => {
      // dispatch('delAllVisitedViews', view)
      // dispatch('delAllCachedViews', view)
      this.delAllVisitedViews(view);
      this.delAllCachedViews(view);
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
      });
    });
  }
  // @Action({ commit: 'DEL_ALL_VISITED_VIEWS' })
  // public delAllVisitedViews(view: any) {
  //   return view;
  // }
  @MutationAction({mutate: []})
  public delAllVisitedViews(view: any) {
    return new Promise((resolve: any) => {
      this.DEL_ALL_VISITED_VIEWS();
      // commit('DEL_ALL_VISITED_VIEWS', view)
      resolve([...this.visitedViews]);
    });
  }
  // @Action({ commit: 'DEL_ALL_CACHED_VIEWS' })
  // public delAllCachedViews(view: any) {
  //   return view;
  // }
  @MutationAction({mutate: []})
  public delAllCachedViews(view: any) {
    return new Promise((resolve: any) => {
      this.DEL_ALL_CACHED_VIEWS();
      // commit('DEL_ALL_CACHED_VIEWS', view)
      resolve([...this.visitedViews]);
    });
  }
  @Action({ commit: 'UPDATE_VISITED_VIEW' })
  public updateVisitedView(view: any) {
    return view;
  }

}

export const TagsModule = getModule(Tags.prototype);
