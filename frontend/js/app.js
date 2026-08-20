/* =====================================================
   PESATRACK FRONTEND CONTROLLER
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
       ================================================= */

    const businessSelect =
        document.getElementById("businessSelect");

    const themeToggle =
        document.getElementById("themeToggle");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");

    const toast =
        document.getElementById("toast");

    const calculatorDisplay =
        document.getElementById("calculatorDisplay");

    const refreshDashboard =
        document.getElementById("refreshDashboard");

    const generateReport =
        document.getElementById("generateReport");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageSubtitle =
        document.getElementById("pageSubtitle");


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
       API CONFIGURATION
       ================================================= */

const API_BASE_URL =
    window.API_BASE_URL ||
    "http://localhost:8080";

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

        toast.textContent = message;

        toast.classList.remove(
            "show",
            "success",
            "error",
            "warning"
        );

        toast.classList.add(type);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        clearTimeout(
            window.pesaTrackToastTimer
        );

        window.pesaTrackToastTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 3000);
    }


    window.showToast = showToast;


    /* =================================================
       BUSINESS STATE
       ================================================= */

    let businesses = [];

    let selectedBusiness = null;


    /* =================================================
       BUSINESS API
       ================================================= */

    async function fetchBusinesses() {

        if (!businessSelect) {
            return;
        }

        businessSelect.disabled = true;

        businessSelect.innerHTML = `
            <option value="">
                Loading businesses...
            </option>
        `;


        try {

const response =
    await fetch(
        `${API_BASE_URL}/api/businesses`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization":
                    `Bearer ${localStorage.getItem("pesatrack-token") || ""}`
            }
        }
    );


            if (response.status === 401) {

                businesses = [];

                renderBusinessSelector();

                return;
            }


            if (!response.ok) {

                throw new Error(
                    `Business request failed: ${response.status}`
                );
            }


            const data =
                await response.json();


            /*
             * Support common backend response formats:
             *
             * [
             *   {...}
             * ]
             *
             * or
             *
             * {
             *   businesses: [...]
             * }
             *
             * or
             *
             * {
             *   data: [...]
             * }
             */

            if (Array.isArray(data)) {

                businesses = data;

            } else if (
                Array.isArray(data.businesses)
            ) {

                businesses =
                    data.businesses;

            } else if (
                Array.isArray(data.data)
            ) {

                businesses =
                    data.data;

            } else {

                businesses = [];
            }


            renderBusinessSelector();

        } catch (error) {

            console.error(
                "Failed to load businesses:",
                error
            );


            businesses = [];

            renderBusinessSelector(
                "Unable to load businesses"
            );
        }
    }


    /* =================================================
       RENDER BUSINESS SELECTOR
       ================================================= */

    function renderBusinessSelector(
        errorMessage = null
    ) {

        if (!businessSelect) {
            return;
        }


        businessSelect.innerHTML = "";


        if (errorMessage) {

            const option =
                document.createElement("option");

            option.value = "";

            option.textContent =
                errorMessage;

            businessSelect.appendChild(
                option
            );

            businessSelect.disabled = false;

            return;
        }


        if (!businesses.length) {

            const option =
                document.createElement("option");

            option.value = "";

            option.textContent =
                "No business found";

            businessSelect.appendChild(
                option
            );


            /*
             * Create-business option.
             * This does not create fake data.
             */

            const createOption =
                document.createElement("option");

            createOption.value =
                "__create_business__";

            createOption.textContent =
                "+ Create New Business";

            businessSelect.appendChild(
                createOption
            );


            businessSelect.disabled = false;

            return;
        }


        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";

        defaultOption.textContent =
            "Select Business";

        businessSelect.appendChild(
            defaultOption
        );


        businesses.forEach(business => {

            const id =
                business.id ??
                business.businessId;

            const name =
                business.name ??
                business.businessName ??
                business.business_name;


            if (
                id === undefined ||
                id === null ||
                !name
            ) {
                return;
            }


            const option =
                document.createElement("option");

            option.value = String(id);

            option.textContent = name;

            businessSelect.appendChild(
                option
            );
        });


        const savedBusiness =
            localStorage.getItem(
                "pesatrack-business"
            );


        if (savedBusiness) {

            const exists =
                businesses.some(
                    business =>
                        String(
                            business.id ??
                            business.businessId
                        ) === savedBusiness
                );


            if (exists) {

                businessSelect.value =
                    savedBusiness;

                selectedBusiness =
                    businesses.find(
                        business =>
                            String(
                                business.id ??
                                business.businessId
                            ) === savedBusiness
                    );
            }
        }


        businessSelect.disabled = false;
    }


    /* =================================================
       BUSINESS SELECTION
       ================================================= */

    if (businessSelect) {

        businessSelect.addEventListener(
            "change",
            () => {

                const businessId =
                    businessSelect.value;


                if (
                    businessId ===
                    "__create_business__"
                ) {

                    businessSelect.value = "";

                    createBusiness();

                    return;
                }


                if (!businessId) {

                    selectedBusiness = null;

                    localStorage.removeItem(
                        "pesatrack-business"
                    );

                    return;
                }


                selectedBusiness =
                    businesses.find(
                        business =>
                            String(
                                business.id ??
                                business.businessId
                            ) === businessId
                    );


                if (!selectedBusiness) {
                    return;
                }


                localStorage.setItem(
                    "pesatrack-business",
                    businessId
                );


                const name =
                    selectedBusiness.name ??
                    selectedBusiness.businessName ??
                    "Business";


                showToast(
                    `${name} selected.`,
                    "success"
                );


                console.log(
                    "Selected business:",
                    selectedBusiness
                );


                refreshBusinessData();
            }
        );
    }


    /* =================================================
       CREATE BUSINESS
       ================================================= */

    async function createBusiness() {

        const businessName =
            window.prompt(
                "Enter your business name:"
            );


        if (!businessName) {
            return;
        }


        const name =
            businessName.trim();


        if (!name) {
            return;
        }


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/businesses`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":
                                "application/json",
                            "Accept":
                                "application/json"
                        },
                        body: JSON.stringify({
                            name
                        })
                    }
                );


            if (!response.ok) {

                const message =
                    await response.text();

                throw new Error(
                    message ||
                    `Create business failed: ${response.status}`
                );
            }


            const createdBusiness =
                await response.json();


            showToast(
                "Business created successfully.",
                "success"
            );


            await fetchBusinesses();


            const createdId =
                createdBusiness.id ??
                createdBusiness.businessId;


            if (createdId !== undefined) {

                businessSelect.value =
                    String(createdId);

                businessSelect.dispatchEvent(
                    new Event("change")
                );
            }

        } catch (error) {

            console.error(
                "Create business error:",
                error
            );


            showToast(
                "Unable to create business.",
                "error"
            );
        }
    }


    /* =================================================
       REFRESH BUSINESS DATA
       ================================================= */

    async function refreshBusinessData() {

        if (!selectedBusiness) {
            return;
        }

        console.log(
            "Refreshing business:",
            selectedBusiness
        );

        /*
         * Backend dashboard integration
         * can be connected here.
         */
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
                "Calculate prices, profit and business figures."
        }
    };


    function showPage(pageName) {

        const targetPage =
            document.getElementById(
                `${pageName}Page`
            );


        if (!targetPage) {

            console.warn(
                `Page "${pageName}" not found.`
            );

            return;
        }


        pages.forEach(page => {

            page.classList.remove(
                "active"
            );

        });


        navItems.forEach(item => {

            item.classList.remove(
                "active"
            );

        });


        targetPage.classList.add(
            "active"
        );


        const activeNav =
            document.querySelector(
                `.nav-item[data-page="${pageName}"]`
            );


        if (activeNav) {

            activeNav.classList.add(
                "active"
            );
        }


        if (pageTitle) {

            pageTitle.textContent =
                pageInfo[pageName]?.title ??
                "PesaTrack";
        }


        if (pageSubtitle) {

            pageSubtitle.textContent =
                pageInfo[pageName]?.subtitle ??
                "";
        }


        if (sidebar) {

            sidebar.classList.remove(
                "open"
            );
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* Sidebar navigation */

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const pageName =
                    item.dataset.page;

                if (pageName) {
                    showPage(pageName);
                }
            }
        );
    });


    /* Dashboard buttons / Quick Actions */

    pageButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const pageName =
                    button.dataset.page;

                if (pageName) {
                    showPage(pageName);
                }
            }
        );
    });


    /* =================================================
       MOBILE MENU
       ================================================= */

    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            () => {

                if (!sidebar) {
                    return;
                }

                sidebar.classList.toggle(
                    "open"
                );
            }
        );
    }


    /* =================================================
       DARK / LIGHT MODE
       ================================================= */

    const savedTheme =
        localStorage.getItem(
            "pesatrack-theme"
        );


    function applyTheme(theme) {

        document.body.classList.toggle(
            "dark",
            theme === "dark"
        );


        if (themeToggle) {

            const label =
                themeToggle.querySelector(
                    "span:last-child"
                );


            if (label) {

                label.textContent =
                    theme === "dark"
                        ? "Light Mode"
                        : "Dark Mode";
            }
        }
    }


    applyTheme(
        savedTheme === "dark"
            ? "dark"
            : "light"
    );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isDark =
                    document.body.classList.contains(
                        "dark"
                    );


                const newTheme =
                    isDark
                        ? "light"
                        : "dark";


                applyTheme(
                    newTheme
                );


                localStorage.setItem(
                    "pesatrack-theme",
                    newTheme
                );


                showToast(
                    `${
                        newTheme === "dark"
                            ? "Dark"
                            : "Light"
                    } mode enabled.`,
                    "success"
                );
            }
        );
    }

/* =================================================
   LOGOUT
   ================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            const confirmed =
                window.confirm(
                    "Are you sure you want to logout?"
                );

            if (!confirmed) {
                return;
            }


            /* Clear current business */
            localStorage.removeItem(
                "pesatrack-business"
            );


            /* Clear authentication token */
            localStorage.removeItem(
                "pesatrack-token"
            );


            /* Clear user session */
            localStorage.removeItem(
                "pesatrack-user"
            );


            /*
             * Do NOT redirect to login.html.
             *
             * login.html does not exist in the
             * current PesaTrack frontend.
             */

            showToast(
                "You have been logged out successfully.",
                "success"
            );


            /*
             * Return dashboard to a clean state
             * instead of opening a missing page.
             */

            setTimeout(() => {

                window.location.href = "/";

            }, 700);

        }
    );
}

    /* =================================================
       CALCULATOR
       ================================================= */

    let calculatorExpression = "";


    function updateCalculatorDisplay() {

        if (!calculatorDisplay) {
            return;
        }


        calculatorDisplay.value =
            calculatorExpression || "0";
    }


    function calculateExpression() {

        if (!calculatorExpression) {
            return;
        }


        try {

            const expression =
                calculatorExpression
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/−/g, "-");


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
                typeof result !== "number" ||
                !Number.isFinite(result)
            ) {

                throw new Error(
                    "Invalid calculation"
                );
            }


            calculatorExpression =
                String(
                    Number(
                        result.toFixed(10)
                    )
                );


            updateCalculatorDisplay();

        } catch (error) {

            calculatorExpression = "";

            if (calculatorDisplay) {

                calculatorDisplay.value =
                    "Error";
            }


            showToast(
                "Invalid calculation.",
                "error"
            );


            setTimeout(
                updateCalculatorDisplay,
                1200
            );
        }
    }


    function handleCalculatorInput(
        value
    ) {

        if (!value) {
            return;
        }


        if (value === "C") {

            calculatorExpression = "";

            updateCalculatorDisplay();

            return;
        }


        if (value === "⌫") {

            calculatorExpression =
                calculatorExpression.slice(
                    0,
                    -1
                );

            updateCalculatorDisplay();

            return;
        }


        if (value === "=") {

            calculateExpression();

            return;
        }


        if (value === ".") {

            const parts =
                calculatorExpression.split(
                    /[+\-×÷]/
                );


            const currentNumber =
                parts[parts.length - 1];


            if (
                currentNumber.includes(".")
            ) {
                return;
            }


            calculatorExpression +=
                currentNumber === ""
                    ? "0."
                    : ".";


            updateCalculatorDisplay();

            return;
        }


        if (
            ["+", "-", "×", "÷", "−"]
                .includes(value)
        ) {

            if (!calculatorExpression) {

                if (
                    value === "×" ||
                    value === "÷"
                ) {
                    return;
                }
            }


            const lastCharacter =
                calculatorExpression.slice(
                    -1
                );


            if (
                ["+", "-", "×", "÷"]
                    .includes(lastCharacter)
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


            updateCalculatorDisplay();

            return;
        }


        if (/^[0-9]$/.test(value)) {

            calculatorExpression += value;

            updateCalculatorDisplay();
        }
    }


    calculatorButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                handleCalculatorInput(
                    button.dataset.value
                );
            }
        );
    });


    /* =================================================
       KEYBOARD CALCULATOR
       ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            const activeElement =
                document.activeElement;

            const tag =
                activeElement?.tagName;


            if (
                tag === "INPUT" &&
                activeElement !==
                    calculatorDisplay
            ) {
                return;
            }


            const key =
                event.key;


            if (/^[0-9]$/.test(key)) {

                handleCalculatorInput(key);

                return;
            }


            if (
                key === "+" ||
                key === "-"
            ) {

                handleCalculatorInput(key);

                return;
            }


            if (key === "*") {

                handleCalculatorInput("×");

                return;
            }


            if (key === "/") {

                handleCalculatorInput("÷");

                return;
            }


            if (key === ".") {

                handleCalculatorInput(".");

                return;
            }


            if (
                key === "Enter" ||
                key === "="
            ) {

                event.preventDefault();

                handleCalculatorInput("=");

                return;
            }


            if (
                key === "Backspace" ||
                key === "Delete"
            ) {

                handleCalculatorInput("⌫");

                return;
            }


            if (key === "Escape") {

                handleCalculatorInput("C");
            }
        }
    );


    /* =================================================
       REFRESH DASHBOARD
       ================================================= */

    if (refreshDashboard) {

        refreshDashboard.addEventListener(
            "click",
            async () => {

                refreshDashboard.disabled =
                    true;

                try {

                    await fetchBusinesses();

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
    }


    /* =================================================
       REPORT
       ================================================= */

    if (generateReport) {

        generateReport.addEventListener(
            "click",
            () => {

                showToast(
                    "Report generation is ready for backend data.",
                    "success"
                );
            }
        );
    }


    /* =================================================
       INITIAL PAGE
       ================================================= */

    const activeNav =
        document.querySelector(
            ".nav-item.active"
        );


    showPage(
        activeNav?.dataset.page ||
        "dashboard"
    );


    /* =================================================
       INITIAL BUSINESS LOAD
       ================================================= */

    fetchBusinesses();


    /* =================================================
       INITIAL CALCULATOR
       ================================================= */

    updateCalculatorDisplay();


    console.log(
        "PesaTrack frontend initialized successfully."
    );

});