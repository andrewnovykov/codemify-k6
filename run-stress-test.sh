
run_test() {
    
    echo "Running all tests"
    for file in tests/stress/*.js; do
        echo "Running test: $file"
        source .env && k6 run $file
    done
    
}

run_test