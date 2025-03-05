﻿#include <iostream>
#include <string>

// Using bottom-up approach - Time: O(n)

class Solution {
public:
    int numDecodings(std::string s)
    {
        int pre2 = 0, pre1 = 1;

        for (int i = 0; i < s.size() && pre1; i++)
        {
            int cur = 0;
            if (s[i] != '0')
                cur += pre1;

            if (i != 0 && s[i - 1] != '0' && (s[i - 1] - '0') * 10 + s[i] - '0' <= 26)
                cur += pre2;

            pre2 = pre1;
            pre1 = cur;
        }

        return pre1;
    }
};

int main()
{
    std::string s = "12";
    std::cout << "Input: s = "<< s << std::endl;

    Solution sol;
    int result = sol.numDecodings(s);
    
    std::cout << "Output: " << result << std::endl;

    return 0;
}
