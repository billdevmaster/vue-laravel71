@inject('request', 'Illuminate\Http\Request')
<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <ul class="sidebar-menu">
            @php
            if(Auth()->user()->role->id == 1):
            @endphp
            <li>
                <router-link :to="{ name: 'home.index' }">
                {{-- <a href="{{ url('/') }}"> --}}
                    <i class="fa fa-wrench"></i>
                    <span class="title">@lang('cams.dashboard')</span>
                {{-- </a> --}}
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'transaction.index' }">
                    <i class="fa fa-exchange"></i>
                    <span class="title">@lang('cams.transaction')</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'cases.index' }">
                    <i class="fa fa-briefcase"></i>
                    <span class="title">@lang('cams.case')</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'currency.index' }">
                    <i class="fa fa-gg"></i>
                    <span class="title">@lang('cams.currency')</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'profit.index' }">
                    <i class="fa fa-money"></i>
                    <span class="title">@lang('cams.profit')</span>
                </router-link>
            </li>
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-users"></i>
                    <span class="title">@lang('cams.user-management.title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <router-link :to="{ name: 'users.index' }">
                            <i class="fa fa-user"></i>
                            <span class="title">
                                @lang('cams.user-management.subtitle.users')
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'roles.index' }">
                            <i class="fa fa-briefcase"></i>
                            <span class="title">
                                @lang('cams.user-management.subtitle.roles')
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'loginhistory.index' }">
                            <i class="fa fa-history"></i>
                            <span class="title">
                                @lang('cams.user-management.subtitle.login-history')
                            </span>
                        </router-link>
                    </li>                
                </ul>
            </li>
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-user-circle"></i>
                    <span class="title">@lang('cams.account-management.title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <router-link :to="{ name: 'account.index', params: { type: 'income' } }">
                            <i class="fa fa-file-text"></i>
                            <span class="title">
                                @lang('cams.account-management.subtitle.income')
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'account.index', params: { type: 'payment' } }">
                            <i class="fa fa-handshake-o"></i>
                            <span class="title">
                                @lang('cams.account-management.subtitle.payment')
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'accountchange.index', params: { type: 'income' } }">
                            <i class="fa fa-bookmark-o"></i>
                            <span class="title">
                                @lang('cams.account-management.subtitle.income-change')
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'accountchange.index', params: { type: 'payment' } }">
                            <i class="fa fa-bookmark"></i>
                            <span class="title">
                                @lang('cams.account-management.subtitle.payment-change')
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'product.index' }">
                            <i class="fa fa-product-hunt"></i>
                            <span class="title">
                                @lang('cams.account-management.subtitle.product')
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'account.history' }">
                            <i class="fa fa-line-chart"></i>
                            <span class="title">
                                @lang('cams.account-management.subtitle.history')
                            </span>
                        </router-link>
                    </li>
                
                </ul>
            </li>
            <li>
                <router-link :to="{ name: 'customers.index' }">
                    <i class="fa fa-users"></i>
                    <span class="title">@lang('cams.customer')</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'companies.index' }">
                    <i class="fa fa-building"></i>
                    <span class="title">@lang('cams.company')</span>
                </router-link>
            </li>

            <li>
                <a href="#logout" onclick="$('#logout').submit();">
                    <i class="fa fa-arrow-left"></i>
                    <span class="title">@lang('cams.logout')</span>
                </a>
            </li>
            @php
            else:
            @endphp
            <li>
                <router-link :to="{ name: 'account.history' }">
                    <i class="fa fa-line-chart"></i>
                    <span class="title">
                        @lang('cams.account-management.subtitle.history')
                    </span>
                </router-link>
            </li>

            <li>
                <a href="#logout" onclick="$('#logout').submit();">
                    <i class="fa fa-arrow-left"></i>
                    <span class="title">@lang('cams.logout')</span>
                </a>
            </li>
            @php
            endif;
            @endphp
        </ul>
    </section>
</aside>

