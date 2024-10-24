#include <iostream>

unsigned long long factorialIterative(int n) {
    unsigned long long result = 1;
    for (int i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}

int main() {
    int number;
    std::cout << "Enter a number: ";
    std::cin >> number;

    if (number < 0) {
        std::cout << "Factorial is not defined for negative numbers." << std::endl;
    } else {
        std::cout << "Factorial of " << number << " (Iterative): " << factorialIterative(number) << std::endl;
    }

    return 0;
}