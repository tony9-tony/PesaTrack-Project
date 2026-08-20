/* =====================================================
   PESATRACK FRONTEND CONTROLLER
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const API_BASE_URL =
        window.API_BASE_URL ||
        "http://localhost:8080";


    /* =================================================
       ELEMENTS
    ================================================= */

    const authScreen =
        document.getElementById("authScreen");

    const landingView =
        document.getElementById("landingView");

    const loginView =
        document.getElementById("loginView");

    const registerView =
        document.getElementById("registerView");

    const forgotView =
        document.getElementById("forgotView");

    const app =
        document.getElementById("app");

    const loginForm =
        document.getElementById("loginForm");

    const registerForm =
        document.getElementById("registerForm");

    const loginSubmit =
        document.getElementById("loginSubmit");

    const registerSubmit =
        document.getElementById("registerSubmit");

    const businessSelect =
        document.getElementById("businessSelect");

    const refreshDashboard =
        document.getElementById("refreshDashboard");

    const generateReport =
        document.getElementById("generateReport");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const themeToggle =
        document.getElementById("themeToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");

    const toast =
        document.getElementById("toast");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageSubtitle =
        document.getElementById("pageSubtitle");

    const calculatorDisplay =
        document.getElementById("calculatorDisplay");

    const pages =
        document.querySelectorAll(".page");

    const navItems =
        document.querySelectorAll(".nav-item");

    const pageButtons =
        document.querySelectorAll(
            "[data-page]:not(.nav-item)"
        );

    const calculatorButtons =
        document.querySelectorAll(
            ".calculator-buttons button[data-value]"
        );


    /* =================================================
       STORAGE
    ================================================= */

    function getToken() {

        return localStorage.getItem(
            "pesatrack-token"
        );
    }


    function getStoredUser() {

        const stored =
            localStorage.getItem(
                "pesatrack-user"
            );

        if (!stored) {
            return null;
        }

        try {

            return JSON.parse(stored);

        } catch {

            localStorage.removeItem(
                "pesatrack-user"
            );

            return null;
        }
    }


    function clearSession() {

        localStorage.removeItem(
            "pesatrack-token"
        );

        localStorage.removeItem(
            "pesatrack-user"
        );

        localStorage.removeItem(
            "pesatrack-business"
        );
    }


    /* =================================================
       TOAST
    ================================================= */

    function showToast(
        message,
        type = "success"
    ) {

        if (!toast) {
            console.log(message);
            return;
        }


        toast.textContent =
            message;


        toast.classList.remove(
            "show",
            "success",
            "error",
            "warning"
        );


        toast.classList.add(
            type
        );


        requestAnimationFrame(
            () => {

                toast.classList.add(
                    "show"
                );

            }
        );


        clearTimeout(
            window.pesaTrackToastTimer
        );


        window.pesaTrackToastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                3000
            );
    }


    window.showToast =
        showToast;


    /* =================================================
       AUTH VIEW
    ================================================= */

    function hideAuthViews() {

        [
            landingView,
            loginView,
            registerView,
            forgotView
        ]
        .forEach(
            view => {

                if (view) {
                    view.hidden = true;
                }

            }
        );
    }


    function showLanding() {

        hideAuthViews();

        if (landingView) {
            landingView.hidden =
                false;
        }

        if (authScreen) {
            authScreen.hidden =
                false;
        }

        if (app) {
            app.hidden = true;
        }

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }


    function showLogin() {

        hideAuthViews();

        if (loginView) {
            loginView.hidden =
                false;
        }

        if (authScreen) {
            authScreen.hidden =
                false;
        }

        if (app) {
            app.hidden = true;
        }

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }


    function showRegister() {

        hideAuthViews();

        if (registerView) {
            registerView.hidden =
                false;
        }

        if (authScreen) {
            authScreen.hidden =
                false;
        }

        if (app) {
            app.hidden = true;
        }

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }


    function showForgotPassword() {

        hideAuthViews();

        if (forgotView) {
            forgotView.hidden =
                false;
        }

        if (authScreen) {
            authScreen.hidden =
                false;
        }

        if (app) {
            app.hidden = true;
        }
    }


    function showApp() {

        hideAuthViews();

        if (authScreen) {
            authScreen.hidden =
                true;
        }

        if (app) {
            app.hidden =
                false;
        }

        updateUserProfile(
            getStoredUser()
        );
    }


    /* =================================================
       USER PROFILE
    ================================================= */

    function updateUserProfile(user) {

        if (!user) {
            return;
        }


        const userName =
            document.getElementById(
                "userName"
            );

        const userAvatar =
            document.getElementById(
                "userAvatar"
            );


        const name =
            user.full_name ||
            user.name ||
            "User";


        if (userName) {
            userName.textContent =
                name;
        }


        if (userAvatar) {

            const initials =
                name
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map(
                        part =>
                            part
                                .charAt(0)
                                .toUpperCase()
                    )
                    .join("");


            userAvatar.textContent =
                initials || "U";
        }
    }


    /* =================================================
       AUTH BUTTONS
    ================================================= */

    document
        .getElementById("landingLogin")
        ?.addEventListener(
            "click",
            showLogin
        );


    document
        .getElementById("landingRegister")
        ?.addEventListener(
            "click",
            showRegister
        );


    document
        .getElementById("landingGetStarted")
        ?.addEventListener(
            "click",
            showRegister
        );


    document
        .getElementById("landingBottomRegister")
        ?.addEventListener(
            "click",
            showRegister
        );


    document
        .getElementById("loginBack")
        ?.addEventListener(
            "click",
            showLanding
        );


    document
        .getElementById("registerBack")
        ?.addEventListener(
            "click",
            showLanding
        );


    document
        .getElementById("loginRegister")
        ?.addEventListener(
            "click",
            showRegister
        );


    document
        .getElementById("registerLogin")
        ?.addEventListener(
            "click",
            showLogin
        );


    document
        .getElementById("forgotPassword")
        ?.addEventListener(
            "click",
            showForgotPassword
        );


    document
        .getElementById("forgotBack")
        ?.addEventListener(
            "click",
            showLogin
        );


    document
        .getElementById("landingExplore")
        ?.addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "landingFeatures"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


    document
        .getElementById("landingBrand")
        ?.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showLanding();

            }
        );


    /* =================================================
       LOGIN
    ================================================= */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const email =
                    document
                        .getElementById(
                            "loginEmail"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "loginPassword"
                        )
                        .value;


                if (!email ||
                    !password
                ) {

                    showToast(
                        "Enter your email and password.",
                        "warning"
                    );

                    return;
                }


                loginSubmit.disabled =
                    true;

                loginSubmit.textContent =
                    "Signing in...";


                try {

                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/auth/login`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",
                                    "Accept":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        email,
                                        password
                                    })
                            }
                        );


                    const data =
                        await response
                            .json()
                            .catch(
                                () => ({})
                            );


                    if (!response.ok) {

                        throw new Error(
                            data.error ||
                            "Invalid email or password."
                        );
                    }


                    if (!data.token) {

                        throw new Error(
                            "The server did not return an authentication token."
                        );
                    }


                    localStorage.setItem(
                        "pesatrack-token",
                        data.token
                    );


                    if (data.user) {

                        localStorage.setItem(
                            "pesatrack-user",
                            JSON.stringify(
                                data.user
                            )
                        );
                    }


                    showApp();


                    showToast(
                        "Login successful.",
                        "success"
                    );


                    await fetchBusinesses();

                    await refreshBusinessData();


                    loginForm.reset();

                } catch (error) {

                    console.error(
                        "Login error:",
                        error
                    );


                    showToast(
                        error.message ||
                        "Unable to login.",
                        "error"
                    );

                } finally {

                    loginSubmit.disabled =
                        false;

                    loginSubmit.textContent =
                        "Sign In";
                }
            }
        );
    }


    /* =================================================
       REGISTER
    ================================================= */

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const fullName =
                    document
                        .getElementById(
                            "registerFullName"
                        )
                        .value
                        .trim();


                const email =
                    document
                        .getElementById(
                            "registerEmail"
                        )
                        .value
                        .trim();


                const phoneNumber =
                    document
                        .getElementById(
                            "registerPhone"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "registerPassword"
                        )
                        .value;


                const confirmPassword =
                    document
                        .getElementById(
                            "registerPasswordConfirm"
                        )
                        .value;


                if (
                    !fullName ||
                    !email ||
                    !password
                ) {

                    showToast(
                        "Please complete all required fields.",
                        "warning"
                    );

                    return;
                }


                if (password.length < 6) {

                    showToast(
                        "Password must contain at least 6 characters.",
                        "warning"
                    );

                    return;
                }


                if (
                    password !==
                    confirmPassword
                ) {

                    showToast(
                        "Passwords do not match.",
                        "warning"
                    );

                    return;
                }


                registerSubmit.disabled =
                    true;

                registerSubmit.textContent =
                    "Creating Account...";


                try {

                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/auth/register`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",
                                    "Accept":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        full_name:
                                            fullName,

                                        email:
                                            email,

                                        phone_number:
                                            phoneNumber,

                                        password:
                                            password
                                    })
                            }
                        );


                    const data =
                        await response
                            .json()
                            .catch(
                                () => ({})
                            );


                    if (!response.ok) {

                        throw new Error(
                            data.error ||
                            "Unable to create account."
                        );
                    }


                    registerForm.reset();


                    document
                        .getElementById(
                            "loginEmail"
                        )
                        .value =
                            email;


                    showToast(
                        "Account created successfully. Please sign in.",
                        "success"
                    );


                    showLogin();

                } catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );


                    showToast(
                        error.message ||
                        "Unable to create account.",
                        "error"
                    );

                } finally {

                    registerSubmit.disabled =
                        false;

                    registerSubmit.textContent =
                        "Create Account";
                }
            }
        );
    }


    /* =================================================
       API HELPER
    ================================================= */

    async function apiRequest(
        path,
        options = {}
    ) {

        const token =
            getToken();


        const headers = {
            "Accept":
                "application/json",
            ...(options.headers || {})
        };


        if (
            options.body &&
            !headers["Content-Type"]
        ) {

            headers["Content-Type"] =
                "application/json";
        }


        if (token) {

            headers["Authorization"] =
                `Bearer ${token}`;
        }


        const response =
            await fetch(
                `${API_BASE_URL}${path}`,
                {
                    ...options,
                    headers
                }
            );


        if (response.status === 401) {

            clearSession();

            showLanding();

            throw new Error(
                "Your session has expired. Please log in again."
            );
        }


        const data =
            await response
                .json()
                .catch(
                    () => ({})
                );


        if (!response.ok) {

            throw new Error(
                data.error ||
                data.message ||
                `Request failed: ${response.status}`
            );
        }


        return data;
    }


    /* =================================================
       BUSINESS
    ================================================= */

    let businesses = [];

    let selectedBusiness =
        null;


    function businessIdOf(
        business
    ) {

        return String(
            business.id ??
            business.business_id ??
            business.businessId ??
            ""
        );
    }


    function businessNameOf(
        business
    ) {

        return (
            business.business_name ??
            business.businessName ??
            business.name ??
            "Business"
        );
    }


    async function fetchBusinesses() {

        if (!businessSelect) {
            return;
        }


        businessSelect.disabled =
            true;


        businessSelect.innerHTML =
            `
            <option value="">
                Loading businesses...
            </option>
            `;


        try {

            const data =
                await apiRequest(
                    "/api/businesses"
                );


            businesses =
                Array.isArray(data)
                    ? data
                    : Array.isArray(
                        data.businesses
                    )
                        ? data.businesses
                        : Array.isArray(
                            data.data
                        )
                            ? data.data
                            : [];


            renderBusinessSelector();


        } catch (error) {

            console.error(
                "Business load error:",
                error
            );


            businesses = [];

            renderBusinessSelector(
                "Unable to load businesses"
            );


            showToast(
                error.message ||
                "Unable to load businesses.",
                "error"
            );
        }
    }


    function renderBusinessSelector(
        errorMessage = null
    ) {

        if (!businessSelect) {
            return;
        }


        businessSelect.innerHTML =
            "";


        if (errorMessage) {

            const option =
                new Option(
                    errorMessage,
                    ""
                );


            businessSelect.appendChild(
                option
            );


            businessSelect.disabled =
                false;


            return;
        }


        if (!businesses.length) {

            businessSelect.appendChild(
                new Option(
                    "No business found",
                    ""
                )
            );


            businessSelect.appendChild(
                new Option(
                    "+ Create New Business",
                    "__create_business__"
                )
            );


            businessSelect.disabled =
                false;


            return;
        }


        businessSelect.appendChild(
            new Option(
                "Select Business",
                ""
            )
        );


        businesses.forEach(
            business => {

                const id =
                    businessIdOf(
                        business
                    );


                const name =
                    businessNameOf(
                        business
                    );


                if (!id) {
                    return;
                }


                businessSelect.appendChild(
                    new Option(
                        name,
                        id
                    )
                );
            }
        );


        const saved =
            localStorage.getItem(
                "pesatrack-business"
            );


        if (saved) {

            const exists =
                businesses.some(
                    business =>
                        businessIdOf(
                            business
                        ) === saved
                );


            if (exists) {

                businessSelect.value =
                    saved;


                selectedBusiness =
                    businesses.find(
                        business =>
                            businessIdOf(
                                business
                            ) === saved
                    );
            }
        }


        businessSelect.disabled =
            false;
    }


    if (businessSelect) {

        businessSelect.addEventListener(
            "change",
            async () => {

                const id =
                    businessSelect.value;


                if (
                    id ===
                    "__create_business__"
                ) {

                    businessSelect.value =
                        "";

                    await createBusiness();

                    return;
                }


                if (!id) {

                    selectedBusiness =
                        null;

                    localStorage.removeItem(
                        "pesatrack-business"
                    );

                    return;
                }


                selectedBusiness =
                    businesses.find(
                        business =>
                            businessIdOf(
                                business
                            ) === id
                    );


                if (!selectedBusiness) {
                    return;
                }


                localStorage.setItem(
                    "pesatrack-business",
                    id
                );


                showToast(
                    `${businessNameOf(selectedBusiness)} selected.`,
                    "success"
                );


                await refreshBusinessData();
            }
        );
    }


    async function createBusiness() {

        const name =
            window.prompt(
                "Enter your business name:"
            );


        if (!name ||
            !name.trim()
        ) {

            return;
        }


        try {

            /*
             * The backend model uses business_name.
             */

            const created =
                await apiRequest(
                    "/api/businesses",
                    {
                        method: "POST",

                        body:
                            JSON.stringify({
                                business_name:
                                    name.trim()
                            })
                    }
                );


            showToast(
                "Business created successfully.",
                "success"
            );


            await fetchBusinesses();


            const createdId =
                businessIdOf(
                    created
                );


            if (
                createdId &&
                businessSelect
            ) {

                businessSelect.value =
                    createdId;


                businessSelect.dispatchEvent(
                    new Event(
                        "change"
                    )
                );
            }

        } catch (error) {

            console.error(
                "Create business error:",
                error
            );


            showToast(
                error.message ||
                "Unable to create business.",
                "error"
            );
        }
    }


    /* =================================================
       BUSINESS QUERY
    ================================================= */

    function businessQuery() {

        if (!selectedBusiness) {
            return "";
        }


        const id =
            businessIdOf(
                selectedBusiness
            );


        return id
            ? `?business_id=${encodeURIComponent(id)}`
            : "";
    }


    /* =================================================
       DASHBOARD
    ================================================= */

    function findValue(
        data,
        keys,
        fallback = 0
    ) {

        if (!data ||
            typeof data !== "object"
        ) {

            return fallback;
        }


        for (
            const key of keys
        ) {

            if (
                data[key] !==
                undefined &&
                data[key] !== null
            ) {

                return data[key];
            }
        }


        return fallback;
    }


    function money(
        value
    ) {

        const number =
            Number(value) || 0;


        return new Intl.NumberFormat(
            "en-TZ",
            {
                style: "currency",
                currency: "TZS",
                maximumFractionDigits: 0
            }
        ).format(number);
    }


    function extractArray(
        data,
        keys
    ) {

        if (Array.isArray(data)) {
            return data;
        }


        if (
            data &&
            typeof data ===
                "object"
        ) {

            for (
                const key of keys
            ) {

                if (
                    Array.isArray(
                        data[key]
                    )
                ) {

                    return data[key];
                }
            }
        }


        return [];
    }


    async function loadDashboard() {

        if (!selectedBusiness) {
            return;
        }


        try {

            const data =
                await apiRequest(
                    `/api/dashboard${businessQuery()}`
                );


            const totalSales =
                findValue(
                    data,
                    [
                        "total_sales",
                        "total_income",
                        "sales",
                        "income"
                    ]
                );


            const totalExpenses =
                findValue(
                    data,
                    [
                        "total_expenses",
                        "expenses"
                    ]
                );


            const totalProfit =
                findValue(
                    data,
                    [
                        "profit",
                        "total_profit",
                        "net_profit"
                    ]
                );


            const stockValue =
                findValue(
                    data,
                    [
                        "stock_value",
                        "total_stock_value",
                        "inventory_value"
                    ]
                );


            document.getElementById(
                "totalSales"
            ).textContent =
                money(totalSales);


            document.getElementById(
                "totalExpenses"
            ).textContent =
                money(totalExpenses);


            document.getElementById(
                "totalProfit"
            ).textContent =
                money(totalProfit);


            document.getElementById(
                "stockValue"
            ).textContent =
                money(stockValue);


        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );


            showToast(
                error.message ||
                "Unable to load dashboard.",
                "error"
            );
        }
    }


    /* =================================================
       TRANSACTIONS
    ================================================= */

    async function loadTransactions() {

        const table =
            document.getElementById(
                "transactionsTable"
            );


        const recent =
            document.getElementById(
                "recentTransactions"
            );


        if (!selectedBusiness) {

            setEmpty(
                table,
                6,
                "Select a business to view transactions."
            );

            return;
        }


        try {

            const data =
                await apiRequest(
                    `/api/transactions${businessQuery()}`
                );


            const transactions =
                extractArray(
                    data,
                    [
                        "transactions",
                        "data"
                    ]
                );


            renderTransactions(
                table,
                transactions
            );


            renderRecentTransactions(
                recent,
                transactions
            );

        } catch (error) {

            console.error(
                "Transactions error:",
                error
            );


            setEmpty(
                table,
                6,
                "Unable to load transactions."
            );
        }
    }


    function renderTransactions(
        table,
        transactions
    ) {

        if (!table) {
            return;
        }


        if (!transactions.length) {

            setEmpty(
                table,
                6,
                "No transactions found."
            );

            return;
        }


        table.innerHTML =
            "";


        transactions.forEach(
            transaction => {

                const row =
                    document.createElement(
                        "tr"
                    );


                const title =
                    transaction.title ??
                    "";


                const description =
                    transaction.description ??
                    "";


                const type =
                    transaction.transaction_type ??
                    transaction.transactionType ??
                    "";


                const payment =
                    transaction.payment_method ??
                    transaction.paymentMethod ??
                    "";


                const amount =
                    transaction.amount ??
                    0;


                const date =
                    transaction.transaction_date ??
                    transaction.transactionDate ??
                    transaction.created_at ??
                    "";


                row.innerHTML = `
                    <td>${escapeHtml(title)}</td>
                    <td>${escapeHtml(description)}</td>
                    <td>${escapeHtml(type)}</td>
                    <td>${escapeHtml(payment)}</td>
                    <td>${money(amount)}</td>
                    <td>${escapeHtml(formatDate(date))}</td>
                `;


                table.appendChild(
                    row
                );
            }
        );
    }


    function renderRecentTransactions(
        target,
        transactions
    ) {

        if (!target) {
            return;
        }


        const recent =
            transactions.slice(
                0,
                5
            );


        if (!recent.length) {

            setEmpty(
                target,
                4,
                "No transactions yet."
            );

            return;
        }


        target.innerHTML =
            "";


        recent.forEach(
            transaction => {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `
                    <td>
                        ${escapeHtml(
                            transaction.title ??
                            ""
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            transaction.transaction_type ??
                            transaction.transactionType ??
                            ""
                        )}
                    </td>

                    <td>
                        ${money(
                            transaction.amount
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            formatDate(
                                transaction.transaction_date ??
                                transaction.transactionDate
                            )
                        )}
                    </td>
                `;


                target.appendChild(
                    row
                );
            }
        );
    }


    /* =================================================
       PRODUCTS
    ================================================= */

    async function loadProducts() {

        const table =
            document.getElementById(
                "productsTable"
            );


        if (!selectedBusiness) {

            setEmpty(
                table,
                6,
                "Select a business to view products."
            );

            return;
        }


        try {

            const data =
                await apiRequest(
                    `/api/products${businessQuery()}`
                );


            const products =
                extractArray(
                    data,
                    [
                        "products",
                        "data"
                    ]
                );


            renderProducts(
                table,
                products
            );

        } catch (error) {

            console.error(
                "Products error:",
                error
            );


            setEmpty(
                table,
                6,
                "Unable to load products."
            );
        }
    }


    function renderProducts(
        table,
        products
    ) {

        if (!table) {
            return;
        }


        if (!products.length) {

            setEmpty(
                table,
                6,
                "No products found."
            );

            return;
        }


        table.innerHTML =
            "";


        products.forEach(
            product => {

                const quantity =
                    Number(
                        product.quantity ||
                        0
                    );


                const buying =
                    Number(
                        product.buying_price ||
                        product.buyingPrice ||
                        0
                    );


                const selling =
                    Number(
                        product.selling_price ||
                        product.sellingPrice ||
                        0
                    );


                const value =
                    quantity *
                    buying;


                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `
                    <td>
                        ${escapeHtml(
                            product.name ?? ""
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            product.description ?? ""
                        )}
                    </td>

                    <td>
                        ${quantity}
                    </td>

                    <td>
                        ${money(buying)}
                    </td>

                    <td>
                        ${money(selling)}
                    </td>

                    <td>
                        ${money(value)}
                    </td>
                `;


                table.appendChild(
                    row
                );
            }
        );
    }


    /* =================================================
       STOCK
    ================================================= */

    async function loadStock() {

        const table =
            document.getElementById(
                "stockTable"
            );


        if (!selectedBusiness) {

            setEmpty(
                table,
                4,
                "Select a business to view stock."
            );

            return;
        }


        try {

            const data =
                await apiRequest(
                    `/api/stock${businessQuery()}`
                );


            const movements =
                extractArray(
                    data,
                    [
                        "stock",
                        "movements",
                        "stock_movements",
                        "data"
                    ]
                );


            renderStock(
                table,
                movements
            );


        } catch (error) {

            console.error(
                "Stock error:",
                error
            );


            setEmpty(
                table,
                4,
                "Unable to load stock movements."
            );
        }
    }


    function renderStock(
        table,
        movements
    ) {

        if (!table) {
            return;
        }


        if (!movements.length) {

            setEmpty(
                table,
                4,
                "No stock movements found."
            );

            return;
        }


        table.innerHTML =
            "";


        movements.forEach(
            movement => {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `
                    <td>
                        ${escapeHtml(
                            movement.product_name ??
                            movement.productName ??
                            movement.product_id ??
                            ""
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            movement.movement_type ??
                            movement.movementType ??
                            ""
                        )}
                    </td>

                    <td>
                        ${movement.quantity ?? 0}
                    </td>

                    <td>
                        ${escapeHtml(
                            formatDate(
                                movement.created_at ??
                                movement.date
                            )
                        )}
                    </td>
                `;


                table.appendChild(
                    row
                );
            }
        );
    }


    /* =================================================
       LOW STOCK
    ================================================= */

    async function loadLowStock() {

        const target =
            document.getElementById(
                "lowStockList"
            );


        if (!target ||
            !selectedBusiness
        ) {

            return;
        }


        try {

            const data =
                await apiRequest(
                    `/api/products/low-stock${businessQuery()}`
                );


            const products =
                extractArray(
                    data,
                    [
                        "products",
                        "data"
                    ]
                );


            if (!products.length) {

                target.innerHTML =
                    `
                    <div class="empty-state">
                        No low-stock products
                    </div>
                    `;

                return;
            }


            target.innerHTML =
                "";


            products
                .slice(0, 8)
                .forEach(
                    product => {

                        const item =
                            document.createElement(
                                "div"
                            );


                        item.className =
                            "stock-item";


                        item.innerHTML = `
                            <div>
                                <strong>
                                    ${escapeHtml(
                                        product.name ?? ""
                                    )}
                                </strong>

                                <span>
                                    Qty:
                                    ${product.quantity ?? 0}
                                </span>
                            </div>
                        `;


                        target.appendChild(
                            item
                        );
                    }
                );


        } catch (error) {

            console.error(
                "Low stock error:",
                error
            );
        }
    }


    /* =================================================
       REPORTS
    ================================================= */

    async function loadReports() {

        if (!selectedBusiness) {
            return;
        }


        try {

            const data =
                await apiRequest(
                    `/api/reports${businessQuery()}`
                );


            const income =
                findValue(
                    data,
                    [
                        "total_income",
                        "income",
                        "total_sales"
                    ]
                );


            const expenses =
                findValue(
                    data,
                    [
                        "total_expenses",
                        "expenses"
                    ]
                );


            const profit =
                findValue(
                    data,
                    [
                        "profit",
                        "total_profit",
                        "net_profit"
                    ]
                );


            const count =
                findValue(
                    data,
                    [
                        "transaction_count",
                        "transactions_count",
                        "total_transactions",
                        "transactions"
                    ]
                );


            document.getElementById(
                "reportIncome"
            ).textContent =
                money(income);


            document.getElementById(
                "reportExpenses"
            ).textContent =
                money(expenses);


            document.getElementById(
                "reportProfit"
            ).textContent =
                money(profit);


            document.getElementById(
                "reportTransactions"
            ).textContent =
                Array.isArray(count)
                    ? count.length
                    : count;

        } catch (error) {

            console.error(
                "Reports error:",
                error
            );


            showToast(
                error.message ||
                "Unable to load reports.",
                "error"
            );
        }
    }


    /* =================================================
       REFRESH ALL BUSINESS DATA
    ================================================= */

    async function refreshBusinessData() {

        if (!selectedBusiness) {

            return;
        }


        await Promise.allSettled([
            loadDashboard(),
            loadTransactions(),
            loadProducts(),
            loadStock(),
            loadLowStock(),
            loadReports()
        ]);
    }


    /* =================================================
       NAVIGATION
    ================================================= */

    const pageInfo = {

        dashboard: {
            title: "Dashboard",
            subtitle:
                "Welcome back. Here's your business overview."
        },

        transactions: {
            title: "Transactions",
            subtitle:
                "Manage your business income and expenses."
        },

        products: {
            title: "Products",
            subtitle:
                "Manage your products and inventory."
        },

        stock: {
            title: "Stock",
            subtitle:
                "Track stock coming in and going out."
        },

        reports: {
            title: "Business Reports",
            subtitle:
                "Understand how your business is performing."
        },

        calculator: {
            title: "Calculator",
            subtitle:
                "Calculate prices and business figures."
        }
    };


    function showPage(
        pageName
    ) {

        const target =
            document.getElementById(
                `${pageName}Page`
            );


        if (!target) {
            return;
        }


        pages.forEach(
            page => {

                page.classList.remove(
                    "active"
                );
            }
        );


        navItems.forEach(
            item => {

                item.classList.remove(
                    "active"
                );
            }
        );


        target.classList.add(
            "active"
        );


        const active =
            document.querySelector(
                `.nav-item[data-page="${pageName}"]`
            );


        active?.classList.add(
            "active"
        );


        if (pageTitle) {

            pageTitle.textContent =
                pageInfo[pageName]?.title ||
                "PesaTrack";
        }


        if (pageSubtitle) {

            pageSubtitle.textContent =
                pageInfo[pageName]?.subtitle ||
                "";
        }


        sidebar?.classList.remove(
            "open"
        );


        if (pageName === "dashboard" &&
            selectedBusiness
        ) {

            refreshBusinessData();
        }


        if (pageName === "transactions" &&
            selectedBusiness
        ) {

            loadTransactions();
        }


        if (pageName === "products" &&
            selectedBusiness
        ) {

            loadProducts();
        }


        if (pageName === "stock" &&
            selectedBusiness
        ) {

            loadStock();
        }


        if (pageName === "reports" &&
            selectedBusiness
        ) {

            loadReports();
        }
    }


    navItems.forEach(
        item => {

            item.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    showPage(
                        item.dataset.page
                    );
                }
            );
        }
    );


    pageButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    showPage(
                        button.dataset.page
                    );
                }
            );
        }
    );


    /* =================================================
       MOBILE MENU
    ================================================= */

    mobileMenu?.addEventListener(
        "click",
        () => {

            sidebar?.classList.toggle(
                "open"
            );
        }
    );


    /* =================================================
       THEME
    ================================================= */

    function applyTheme(
        theme
    ) {

        document.body.classList.toggle(
            "dark",
            theme === "dark"
        );


        const label =
            themeToggle?.querySelector(
                "span:last-child"
            );


        if (label) {

            label.textContent =
                theme === "dark"
                    ? "Light Mode"
                    : "Dark Mode";
        }
    }


    const savedTheme =
        localStorage.getItem(
            "pesatrack-theme"
        ) || "light";


    applyTheme(
        savedTheme
    );


    themeToggle?.addEventListener(
        "click",
        () => {

            const next =
                document.body.classList.contains(
                    "dark"
                )
                    ? "light"
                    : "dark";


            localStorage.setItem(
                "pesatrack-theme",
                next
            );


            applyTheme(
                next
            );
        }
    );


    /* =================================================
       LOGOUT
    ================================================= */

    logoutBtn?.addEventListener(
        "click",
        () => {

            const confirmed =
                window.confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) {
                return;
            }


            clearSession();

            businesses = [];

            selectedBusiness =
                null;


            showToast(
                "Logged out successfully.",
                "success"
            );


            setTimeout(
                showLanding,
                400
            );
        }
    );


    /* =================================================
       CALCULATOR
    ================================================= */

    let calculatorExpression =
        "";


    function updateCalculator() {

        if (!calculatorDisplay) {
            return;
        }


        calculatorDisplay.value =
            calculatorExpression ||
            "0";
    }


    function calculate() {

        if (!calculatorExpression) {
            return;
        }


        try {

            const expression =
                calculatorExpression
                    .replaceAll("×", "*")
                    .replaceAll("÷", "/")
                    .replaceAll("−", "-");


            if (
                !/^[0-9+\-*/().\s]+$/.test(
                    expression
                )
            ) {

                throw new Error(
                    "Invalid expression"
                );
            }


            const result =
                Function(
                    `"use strict"; return (${expression})`
                )();


            if (
                typeof result !==
                    "number" ||
                !Number.isFinite(result)
            ) {

                throw new Error(
                    "Invalid result"
                );
            }


            calculatorExpression =
                String(
                    Number(
                        result.toFixed(10)
                    )
                );


            updateCalculator();

        } catch {

            calculatorExpression =
                "";


            calculatorDisplay.value =
                "Error";


            showToast(
                "Invalid calculation.",
                "error"
            );


            setTimeout(
                updateCalculator,
                1000
            );
        }
    }


    function calculatorInput(
        value
    ) {

        if (!value) {
            return;
        }


        if (value === "C") {

            calculatorExpression =
                "";

            updateCalculator();

            return;
        }


        if (value === "⌫") {

            calculatorExpression =
                calculatorExpression.slice(
                    0,
                    -1
                );

            updateCalculator();

            return;
        }


        if (value === "=") {

            calculate();

            return;
        }


        if (value === ".") {

            const parts =
                calculatorExpression.split(
                    /[+\-×÷]/
                );


            const current =
                parts[
                    parts.length - 1
                ];


            if (
                current.includes(".")
            ) {

                return;
            }


            calculatorExpression +=
                current === ""
                    ? "0."
                    : ".";


            updateCalculator();

            return;
        }


        if (
            [
                "+",
                "-",
                "×",
                "÷",
                "−"
            ].includes(value)
        ) {

            const last =
                calculatorExpression.slice(
                    -1
                );


            if (
                !calculatorExpression &&
                (
                    value === "×" ||
                    value === "÷"
                )
            ) {

                return;
            }


            if (
                [
                    "+",
                    "-",
                    "×",
                    "÷"
                ].includes(last)
            ) {

                calculatorExpression =
                    calculatorExpression.slice(
                        0,
                        -1
                    );
            }


            calculatorExpression +=
                value === "−"
                    ? "-"
                    : value;


            updateCalculator();

            return;
        }


        if (
            /^[0-9]$/.test(value)
        ) {

            calculatorExpression +=
                value;


            updateCalculator();
        }
    }


    calculatorButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    calculatorInput(
                        button.dataset.value
                    );
                }
            );
        }
    );


    document.addEventListener(
        "keydown",
        event => {

            const tag =
                document.activeElement
                    ?.tagName;


            if (
                tag === "INPUT" &&
                document.activeElement !==
                    calculatorDisplay
            ) {

                return;
            }


            if (
                /^[0-9]$/.test(
                    event.key
                )
            ) {

                calculatorInput(
                    event.key
                );

                return;
            }


            if (
                event.key === "+" ||
                event.key === "-"
            ) {

                calculatorInput(
                    event.key
                );

                return;
            }


            if (event.key === "*") {

                calculatorInput("×");

                return;
            }


            if (event.key === "/") {

                calculatorInput("÷");

                return;
            }


            if (event.key === ".") {

                calculatorInput(".");

                return;
            }


            if (
                event.key === "Enter" ||
                event.key === "="
            ) {

                event.preventDefault();

                calculatorInput("=");

                return;
            }


            if (
                event.key === "Backspace" ||
                event.key === "Delete"
            ) {

                calculatorInput("⌫");

                return;
            }


            if (
                event.key === "Escape"
            ) {

                calculatorInput("C");
            }
        }
    );


    /* =================================================
       REFRESH
    ================================================= */

    refreshDashboard?.addEventListener(
        "click",
        async () => {

            refreshDashboard.disabled =
                true;


            try {

                await refreshBusinessData();


                showToast(
                    "Dashboard refreshed.",
                    "success"
                );

            } finally {

                refreshDashboard.disabled =
                    false;
            }
        }
    );


    generateReport?.addEventListener(
        "click",
        async () => {

            await loadReports();

            showToast(
                "Report refreshed.",
                "success"
            );
        }
    );


    /* =================================================
       UTILITY
    ================================================= */

    function setEmpty(
        target,
        colspan,
        message
    ) {

        if (!target) {
            return;
        }


        target.innerHTML =
            `
            <tr>
                <td
                    colspan="${colspan}"
                    class="empty-state"
                >
                    ${escapeHtml(message)}
                </td>
            </tr>
            `;
    }


    function escapeHtml(
        value
    ) {

        return String(
            value ?? ""
        )
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }


    function formatDate(
        value
    ) {

        if (!value) {
            return "";
        }


        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return String(value);
        }


        return date.toLocaleDateString(
            "en-TZ",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );
    }


    /* =================================================
       INITIALIZATION
    ================================================= */

    updateCalculator();


    if (getToken()) {

        showApp();

        fetchBusinesses();

    } else {

        showLanding();
    }


    console.log(
        "PesaTrack initialized."
    );

});