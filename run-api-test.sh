run_test() {
    node global.js
    echo "Running all tests"
    for file in tests/api/*.js; do
        echo "Running test: $file"
        source .env && k6 run $file
    done    
}

run_test