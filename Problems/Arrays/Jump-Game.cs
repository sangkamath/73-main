public class Solution {
    public bool CanJump(int[] nums) {
        int goalpost = nums.Length - 1;

        for(var i = nums.Length - 2; i >= 0; i--) {
            if(i + nums[i] >= goalpost) {
                goalpost = i;
            }
        }
        
        return goalpost == 0;
    }
}