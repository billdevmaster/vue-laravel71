@inject('request', 'Illuminate\Http\Request')
<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <ul class="sidebar-menu">

            <li>
                <router-link :to="{ name: 'home.index' }">
                {{-- <a href="{{ url('/') }}"> --}}
                    <i class="fa fa-wrench"></i>
                    <span class="title">@lang('quickadmin.qa_dashboard')</span>
                {{-- </a> --}}
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'transaction.index' }">
                    <i class="fa fa-exchange"></i>
                    <span class="title">Transaction</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'customers.index' }">
                    <i class="fa fa-users"></i>
                    <span class="title">Customers</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'cases.index' }">
                    <i class="fa fa-briefcase"></i>
                    <span class="title">Case</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'currency.index' }">
                    <i class="fa fa-gg"></i>
                    <span class="title">Currency</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'profit.index' }">
                    <i class="fa fa-money"></i>
                    <span class="title">Profit</span>
                </router-link>
            </li>
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-users"></i>
                    <span class="title">@lang('quickadmin.user-management.title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <router-link :to="{ name: 'roles.index' }">
                            <i class="fa fa-briefcase"></i>
                            <span class="title">
                                @lang('quickadmin.roles.title')
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'users.index' }">
                            <i class="fa fa-user"></i>
                            <span class="title">
                                @lang('quickadmin.users.title')
                            </span>
                        </router-link>
                    </li>
                
                </ul>
            </li>
            <li>
                <router-link :to="{ name: 'companies.index' }">
                    <i class="fa fa-gears"></i>
                    <span class="title">@lang('quickadmin.companies.title')</span>
                </router-link>
            </li>

            <li>
                <a href="#logout" onclick="$('#logout').submit();">
                    <i class="fa fa-arrow-left"></i>
                    <span class="title">@lang('quickadmin.qa_logout')</span>
                </a>
            </li>
        </ul>
    </section>
</aside>

